import express from 'express';
import { and, eq, inArray, or, sql } from 'drizzle-orm';

import { type Resources } from './Service';
import { friendships, tags, users, usersToTags, UsersType } from '../../models/schema';

import { z, ZodError } from 'zod';

interface FriendProfile extends UsersType {
  mutualFriends?: number;
  message?: string;
}

type FriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked';

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

  public async getUserTags(userId: number) {
    const results = await this.resources.db
      .select({
        id: tags.id,
        text: tags.text,
      })
      .from(tags)
      .innerJoin(
        usersToTags,
        and(
          eq(usersToTags.userId, userId),
          eq(usersToTags.tagId, tags.id),
        ),
      );
    return results;
  }

  public async createTag(userId: number, tagText: string) {
    // check if tag already exists
    const tagSelectResults = await this.resources.db
      .select()
      .from(tags)
      .where(eq(tags.text, tagText));
    if (tagSelectResults.length > 0) {
      return tagSelectResults[0].id;
    }
    // if tag doesn't exist, create it
    const tagInsertResults = await this.resources.db
      .insert(tags)
      .values({
        text: tagText,
        creatorId: userId,
      });
    return tagInsertResults[0].insertId;
  }

  public async addUserToTag(userId: number, tagId: number) {
    try {
      await this.resources.db
        .insert(usersToTags)
        .values({
          userId,
          tagId,
        })
        .onDuplicateKeyUpdate({ set: { userId: sql`user_id` } });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async deleteUserToTag(userId: number, tagId: number) {
    const results = await this.resources.db
      .delete(usersToTags)
      .where(and(eq(usersToTags.userId, userId), eq(usersToTags.tagId, tagId)));
    return results[0].affectedRows === 1;
  }

  public async getFriendshipIds(id: number, status: FriendshipStatus[] = ['accepted']) {
    const friendshipIds = await this.resources.db
      .select({
        inviterId: friendships.inviterId,
        inviteeId: friendships.inviteeId,
      })
      .from(friendships)
      .where(and(
        inArray(friendships.status, status),
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

  public async getFriendRequests(id: number) {
    const pendingFriendships = await this.resources.db
      .select({
        inviterId: friendships.inviterId,
        inviteeId: friendships.inviteeId,
        message: friendships.message,
      })
      .from(friendships)
      .where(and(
        eq(friendships.status, 'pending'),
        eq(friendships.inviteeId, id),
      ));
    if (pendingFriendships.length === 0) {
      return [];
    }
    const pendingFriendIds = pendingFriendships.map(friendship => friendship.inviterId);
    const pendingFriendProfiles = await this.getFriendProfiles(pendingFriendIds);
    pendingFriendProfiles.forEach((friend, index) => {
      friend.message = pendingFriendships[index].message as string;
    });
    return pendingFriendProfiles;
  }

  public async createFriendRequest(inviterId: number, inviteeId: number, message: string) {
    const results = await this.resources.db
      .insert(friendships)
      .values({
        inviterId,
        inviteeId,
        message,
      })
      .execute();
    return { created: results[0].affectedRows === 1 };
  }

  public async updateFriendRequest(id:number, friendId: number, status:FriendshipStatus) {
    const results = await this.resources.db
      .update(friendships)
      .set({ status })
      .where(and(
        eq(friendships.inviterId, friendId),
        eq(friendships.inviteeId, id),
        eq(friendships.status, 'pending'),
      ));

    return { updated: results[0].affectedRows === 1 };
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

  public async handleGetUserTags(req: express.Request, res: express.Response) {
    const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;

    const results = await this.controller.getUserTags(userId);
    if (results) {
      return results;
    }
    return new Error('User not found');
  }

  public async handleAddUserTag(req: express.Request, res: express.Response) {
    const { userId } = req.session;
    let tagId = parseInt(req.params.tagId, 10);
    const tagText = req.body.text;

    if (Number.isNaN(tagId)) {
      if (!tagText) {
        return new Error('Must provide a tag id or text');
      }
      tagId = await this.controller.createTag(userId!, tagText);
    }

    const added = await this.controller.addUserToTag(userId!, tagId);
    return added ? { tagId } : false;
  }

  public async handleDeleteUserTag(req: express.Request, res: express.Response) {
    const { userId } = req.session;
    const tagId = parseInt(req.params.tagId, 10);

    const removed = await this.controller.deleteUserToTag(userId!, tagId);
    return { removed };
  }

  public async handleGetFriendslist(req: express.Request, res: express.Response) {
    const { userId } = req.session;

    try {
      return await this.controller.getFriendslist(userId!);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleGetFriendRequests(req: express.Request, res: express.Response) {
    const { userId } = req.session;

    try {
      return await this.controller.getFriendRequests(userId!);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleCreateFriendRequest(req: express.Request, res: express.Response) {
    const { userId: inviterId } = req.session;
    const { message } = req.body;
    const inviteeId = parseInt(req.params.userId, 10);

    if (!inviteeId) {
      return new Error('Must provide a valid user id');
    }

    if (inviteeId === inviterId) {
      return new Error('You cannot send a friend request to yourself');
    }

    // TODO: different responses depending on the status of the friendship
    const existingFriendship = await this.controller.getFriendshipIds(inviterId!, ['accepted', 'pending', 'blocked', 'rejected']);
    if (existingFriendship.includes(inviteeId)) {
      return new Error('You are already have a relationship with this user');
    }

    return this.controller.createFriendRequest(inviterId!, inviteeId, message);
  }

  public async handleUpdateFriendRequest(req: express.Request, res: express.Response) {
    const { userId } = req.session;
    const { status } = req.body;
    const friendId = parseInt(req.params.userId, 10);

    if (!['accepted', 'rejected'].includes(status)) {
      return new Error('Must supply valid status');
    }

    try {
      return this.controller.updateFriendRequest(userId!, friendId, status);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }
}
