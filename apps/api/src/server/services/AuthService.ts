import { promisify } from 'util';

import { eq } from 'drizzle-orm';
import { MySqlInsertValue } from 'drizzle-orm/mysql-core';
import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';

import { isSqlError } from '../utils';
import { BaseService, type Resources } from './Service';
import { user } from '../../models/schema';

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
  ) {
    const salt = randomBytes(16);
    const hashedPassword = (await pbkdf2Promise(password, salt, 310000, 16, 'sha256'));

    const userValues: MySqlInsertValue<typeof user> = {
      email,
      hashedPassword: hashedPassword.toString('hex'),
      salt: salt.toString('hex'),
      firstName,
      lastName,
      createdAt: new Date(),
    };

    const insertResults = await this.resources.db
      .insert(user)
      .values(userValues)
      .execute();

    return insertResults[0];
  }

  public async login(email: string, password: string) {
    const userRecord = await this.resources.db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (userRecord.length !== 1) {
      return null;
    }

    const salt = Buffer.from(userRecord[0].salt, 'hex');
    const generatedHashedPassword = await pbkdf2Promise(password, salt, 310000, 16, 'sha256');
    const retrievedHashedPassword = Buffer.from(userRecord[0].hashedPassword, 'hex');

    return timingSafeEqual(retrievedHashedPassword, generatedHashedPassword) ? userRecord[0].id : null;
  }
}

export class AuthService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/auth');

    const controller = new AuthController(resources);
    this.router.use(resources.sessions);

    this.router.post('/signup', async (req, res) => {
      const { email, password, firstName, lastName } = req.body;
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          message: 'Missing required fields',
        });
        return;
      }

      try {
        const insertedUser = await controller.signup(
          email.toString(),
          password.toString(),
          firstName.toString(),
          lastName.toString(),
        );

        if (insertedUser) {
          res.status(200).json({ userId: insertedUser.insertId });
        } else {
          res.status(500).json({
            message: 'User not created',
          });
        }
      } catch (e) {
        if (isSqlError(e) && e.code === 'ER_DUP_ENTRY') {
          res.status(500).json({
            message: 'User already exists',
          });
        } else {
          res.status(500).json({
            err: e,
            message: 'An error occurred',
          });
        }
      }
    });

    this.router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          message: 'Missing required fields',
        });
        return;
      }

      const userId = await controller.login(email.toString(), password.toString());
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

        res.status(200).json({ userId });
      } else {
        res.status(401).json({
          message: 'Invalid email or password',
        });
      }
    });

    this.router.post('/logout', async (req, res) => {
      req.session.authenticated = false;
      res.status(200).json({ message: 'Logged out' });
    });
  }
}
