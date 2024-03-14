import { eq } from 'drizzle-orm';

import { BaseService, type Resources } from './Service';
import { user, UserType } from '../../models/schema';
import { authenticate } from '../middleware/Authenticate';

import { z, ZodError } from 'zod';


const updateUserProfileSchema = z.object({
  email: z.string().email().toLowerCase(),
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  displayName: z.string().max(20),
  profileImageUrl: z.string().url().max(255),
  birthDate: z.coerce.date(),
}).partial();

export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async getProfile(id: number) {
    const results = await this.resources.db
      .select({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        profileImageUrl: user.profileImageUrl,
        birthDate: user.birthDate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
      })
      .from(user)
      .where(eq(user.id, id));
    return results.length !== 1 ? null : results[0];
  }

  public async updateProfile(id: number, updateData: Partial<UserType>) {
    const results = await this.resources.db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id));

    // affectedRows will be 1 even if no data was actually changed;
    // changedRows would show actual db changes (but is deprecated)
    return { updated: results[0].affectedRows === 1 };
  }
}

export class UserService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/user');

    const controller = new UserController(resources);
    this.router.use(authenticate);

    this.router.get('/:userId?/profile', async (req, res) => {
      const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;
      const getProfileResult = await controller.getProfile(userId);
      if (getProfileResult) {
        res.status(200).json(getProfileResult);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });

    this.router.patch('/profile', async (req, res) => {
      const { userId } = req.session;
      try {
        const parsedUpdateData: Partial<UserType> = updateUserProfileSchema.parse(req.body);
        const updateProfileResult = await controller.updateProfile(userId!, parsedUpdateData);
        res.status(200).json(updateProfileResult);
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({ errors: err.errors });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });
  }
}
