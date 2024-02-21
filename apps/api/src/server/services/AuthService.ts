import { promisify } from 'util';

import { MySqlInsertValue } from 'drizzle-orm/mysql-core';
import { pbkdf2, randomBytes } from 'crypto';

import { isSqlError } from '../utils';
import { BaseService, type Resources } from './Service';
import { user } from '../../models/user';

const pbkdf2Promise = promisify(pbkdf2);

export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const salt = randomBytes(16).toString('utf8');
    const hashedPassword = (await pbkdf2Promise(password, salt, 310000, 32, 'sha256')).toString('utf8');

    const userValues: MySqlInsertValue<typeof user> = {
      email,
      hashedPassword,
      salt,
      firstName,
      lastName,
    };

    const insertResults = await this.resources.db
      .insert(user)
      .values(userValues)
      .execute();

    return insertResults[0];
  }
}

export class AuthService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/auth');

    const controller = new AuthController(resources);

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
          res.status(200).json(insertedUser);
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
  }
}
