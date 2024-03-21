import express from 'express';
import { and, eq, inArray, or } from 'drizzle-orm';

import { type Resources } from './Service';
import { friendships, users, UsersType } from '../../models/schema';

import { z, ZodError } from 'zod';

interface FriendProfile extends UsersType {
  mutualFriends: number;
}

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
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        displayName: users.displayName,
        profileImageUrl: users.profileImageUrl,
        birthDate: users.birthDate,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        lastLoginAt: users.lastLoginAt,
      })
      .from(users)
      .where(eq(users.id, id));
    return results.length !== 1 ? null : results[0];
  }

  public async updateProfile(id: number, updateData: Partial<UsersType>) {
    const results = await this.resources.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id));

    // affectedRows will be 1 even if no data was actually changed;
    // changedRows would show actual db changes (but is deprecated)
    return { updated: results[0].affectedRows === 1 };
  }

  public async getFriendshipIds(id: number) {
    const friendshipIds = await this.resources.db
      .select({
        inviterId: friendships.inviterId,
        inviteeId: friendships.inviteeId,
      })
      .from(friendships)
      .where(and(
        eq(friendships.status, 'accepted'),
        or(eq(friendships.inviterId, id), eq(friendships.inviteeId, id)),
      ));
    // get ids just of the other users in the friendship
    return friendshipIds.map(friend => (friend.inviterId === id ? friend.inviteeId : friend.inviterId));
  }

  public async getFriendProfiles(friendIds: number[]) {
    return await this.resources.db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        displayName: users.displayName,
        profileImageUrl: users.profileImageUrl,
        email: users.email,
        twitter: users.twitter,
        facebook: users.facebook,
        instagram: users.instagram,
      })
      .from(users)
      .where(inArray(users.id, friendIds)) as FriendProfile[];
  }

  public async getFriendslist(id: number) {
    const friendIds = await this.getFriendshipIds(id);
    const friendProfiles = await this.getFriendProfiles(friendIds);
    const friendsOfFriends = await Promise.all(friendProfiles.map(friend => this.getFriendshipIds(friend.id!)));

    friendProfiles.forEach((friend, index) => {
      const mutualFriendsCount = friendsOfFriends[index].filter(friendId => friendIds.includes(friendId)).length;
      friend.mutualFriends = mutualFriendsCount;
    });

    return friendProfiles;
  }
}

export class UserService {
  private readonly controller: UserController;

  constructor(resources: Resources) {
    this.controller = new UserController(resources);
  }

  public async handleGetProfile(req: express.Request, res: express.Response) {
    const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;

    const getProfileResult = await this.controller.getProfile(userId);

    if (getProfileResult) {
      return getProfileResult;
    }

    return new Error('User not found');
  }

  public async handleEditProfile(req: express.Request, res: express.Response) {
    const { userId } = req.session;

    try {
      const parsedUpdateData: Partial<UsersType> = updateUserProfileSchema.parse(req.body);
      const updateProfileResult = await this.controller.updateProfile(userId!, parsedUpdateData);

      return updateProfileResult;
    } catch (err) {
      if (err instanceof ZodError) {
        return new Error(err.errors[0].message);
      }

      return new Error('Internal Server Error');
    }
  }

  public async handleGetFriendslist(req: express.Request, res: express.Response) {
    const { userId } = req.session;

    try {
      return await this.controller.getFriendslist(userId!);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }
}
