import { boolean, date, int, mysqlTable, primaryKey, timestamp, varchar } from 'drizzle-orm/mysql-core';
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
  displayName: varchar('displayName', { length: 20 }),
  profileImageUrl: varchar('profileImageUrl', { length: 255 }),
  birthDate: date('birthDate'),
  about: varchar('about', { length: 1000 }),
  isAdmin: boolean('isAdmin').default(false),
});

export const tag = mysqlTable('tag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  creatorId: int('creatorId').references(() => user.id, { onDelete: 'set null' }),
  text: varchar('text', { length: 50 }).notNull().unique(),
});

export const userToTag = mysqlTable('user_to_tag', {
  userId: int('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  tagId: int('tagId').notNull().references(() => tag.id, { onDelete: 'cascade' }),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.tagId] }),
}));

export const userRelations = relations(user, ({ many }) => ({
  tags: many(userToTag),
}));

export const tagRelations = relations(tag, ({ one, many }) => ({
  creator: one(user, {
    fields: [tag.creatorId],
    references: [user.id],
  }),
  users: many(userToTag),
}));

export const userToTagRelations = relations(userToTag, ({ one }) => ({
  user: one(user, {
    fields: [userToTag.userId],
    references: [user.id],
  }),
  tag: one(tag, {
    fields: [userToTag.tagId],
    references: [tag.id],
  }),
}));


export type UserType = InferInsertModel<typeof user>;
export type TagType = InferInsertModel<typeof tag>;
export type UserToTagType = InferInsertModel<typeof userToTag>;
