import { date, int, mysqlEnum, mysqlTable, primaryKey, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { InferInsertModel, relations } from 'drizzle-orm';

export const users = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  lastLoginAt: timestamp('last_login_at'),
  email: varchar('email', { length: 255 }).unique().notNull(),
  hashedPassword: varchar('hashed_password', { length: 128 }).notNull(),
  salt: varchar('salt', { length: 128 }).notNull(),
  firstName: varchar('first_name', { length: 20 }),
  lastName: varchar('last_name', { length: 20 }),
  displayName: varchar('display_name', { length: 20 }),
  profileImageUrl: varchar('profile_image_url', { length: 255 }),
  birthDate: date('birth_date'),
  about: varchar('about', { length: 1000 }),
  twitter: varchar('twitter', { length: 50 }),
  facebook: varchar('facebook', { length: 50 }),
  instagram: varchar('instagram', { length: 50 }),
});

export const tags = mysqlTable('tag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').notNull().$defaultFn(() => new Date()),
  creatorId: int('creator_id').references(() => users.id, { onDelete: 'set null' }),
  text: varchar('text', { length: 20 }).notNull().unique(),
});

export const usersToTags = mysqlTable('user_to_tag', {
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  tagId: int('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, table => ({
  pk: primaryKey({ columns: [table.userId, table.tagId] }),
}));

export const friendships = mysqlTable('friendship', {
  inviterId: int('inviter_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  inviteeId: int('invitee_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  message: varchar('text', { length: 200 }),
  status: mysqlEnum('status', ['pending', 'accepted', 'rejected', 'blocked']).notNull().default('pending'),
}, table => ({
  pk: primaryKey({ columns: [table.inviterId, table.inviteeId] }),
  // TODO: prevent duplicate rows with inviterId and inviteeId swapped
}));

export const usersRelations = relations(users, ({ many }) => ({
  tags: many(usersToTags),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
  creator: one(users, {
    fields: [tags.creatorId],
    references: [users.id],
  }),
  users: many(usersToTags),
}));

export const usersToTagsRelations = relations(usersToTags, ({ one }) => ({
  user: one(users, {
    fields: [usersToTags.userId],
    references: [users.id],
  }),
  tag: one(tags, {
    fields: [usersToTags.tagId],
    references: [tags.id],
  }),
}));


export type UsersType = InferInsertModel<typeof users>;
export type TagsType = InferInsertModel<typeof tags>;
export type UsersToTagsType = InferInsertModel<typeof usersToTags>;
export type FriendshipsType = InferInsertModel<typeof friendships>;
