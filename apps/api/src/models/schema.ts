import { boolean, date, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { InferInsertModel, relations } from 'drizzle-orm';

export const user = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
  lastLoginAt: timestamp('lastLoginAt'),
  email: varchar('email', { length: 255 }).unique().notNull(),
  isEmailVerified: boolean('isEmailVerified').default(false),
  hashedPassword: varchar('hashedPassword', { length: 128 }).notNull(),
  salt: varchar('salt', { length: 128 }).notNull(),
  firstName: varchar('firstName', { length: 20 }),
  lastName: varchar('lastName', { length: 20 }),
  displayName: varchar('username', { length: 20 }),
  profileImageUrl: varchar('profileImageUrl', { length: 255 }),
  birthDate: date('birthDate'),
  isAdmin: boolean('isAdmin').default(false),
});

export const tag = mysqlTable('tag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  creatorId: int('creatorId'),
});

export const userInterestTag = mysqlTable('userInterestTag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  userId: int('userId'),
  tagId: int('tagId'),
});

export const tagRelations = relations(tag, ({ one }) => ({
  user: one(user, {
    fields: [tag.creatorId],
    references: [user.id],
  }),
}));

export const userInterestTagRelations = relations(userInterestTag, ({ one }) => ({
  user: one(user, {
    fields: [userInterestTag.userId],
    references: [user.id],
  }),
  tag: one(tag, {
    fields: [userInterestTag.tagId],
    references: [tag.id],
  }),
}));


export type UserType = InferInsertModel<typeof user>;
export type TagType = InferInsertModel<typeof tag>;
export type UserInterestTagType = InferInsertModel<typeof userInterestTag>;
