import express from 'express';
import { promisify } from 'util';

import { eq } from 'drizzle-orm';
import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';

import { isSqlError } from '../utils';
import { type Resources } from './Service';
import { users, UsersType } from '../../models/schema';

const pbkdf2Promise = promisify(pbkdf2);

declare module 'express-session' {
  interface SessionData {
    userId: number;
    authenticated: boolean;
  }
}

export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    region: string,
    city: string,
  ) {
    const salt = randomBytes(16);
    const hashedPassword = (await pbkdf2Promise(password, salt, 310000, 16, 'sha256'));

    const userValues: UsersType = {
      email,
      hashedPassword: hashedPassword.toString('hex'),
      salt: salt.toString('hex'),
      firstName,
      lastName,
      country,
      region,
      city,
      createdAt: new Date(),
    };

    const insertResults = await this.resources.db
      .insert(users)
      .values(userValues)
      .execute();

    return insertResults[0];
  }

  public async login(email: string, password: string) {
    const userRecord = await this.resources.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (userRecord.length !== 1) {
      return null;
    }

    const salt = Buffer.from(userRecord[0].salt, 'hex');
    const generatedHashedPassword = await pbkdf2Promise(password, salt, 310000, 16, 'sha256');
    const retrievedHashedPassword = Buffer.from(userRecord[0].hashedPassword, 'hex');

    return timingSafeEqual(retrievedHashedPassword, generatedHashedPassword) ? userRecord[0].id : null;
  }
}

export class AuthService {
  private readonly controller: AuthController;

  constructor(resources: Resources) {
    this.controller = new AuthController(resources);
  }

  public async handleSignUp(req: express.Request, res: express.Response) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return new Error('Missing required fields');
    }

    try {
      const insertedUser = await this.controller.signup(
        email.toString(),
        password.toString(),
        firstName.toString(),
        lastName.toString(),
        country.toString(),
        region.toString(),
        city.toString(),
      );

      return { userId: insertedUser.insertId };
    } catch (e) {
      if (isSqlError(e) && e.code === 'ER_DUP_ENTRY') {
        return new Error('User already exists.');
      }
    }

    return new Error('Internal Server Error');
  }

  public async handleLogin(req: express.Request, res: express.Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return new Error('Missing required fields (email, password)');
    }

    const userId = await this.controller.login(email.toString(), password.toString());

    if (userId) {
      // Reason: We don't care that the user can change their
      // authenticated status mid-way between requests that require
      // authenticated users.
      //
      // If it does occur, then those requests will simply pass as
      // intended.
      /* eslint-disable require-atomic-updates */
      req.session.userId = userId;
      req.session.authenticated = true;
      /* eslint-enable require-atomic-updates */

      return { userId };
    }

    return new Error('Invalid email or password');
  }

  public async handleLogout(req: express.Request, res: express.Response) {
    req.session.authenticated = false;

    return 'Logged out';
  }
}
