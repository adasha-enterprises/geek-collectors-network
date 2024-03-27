import { boolean, date, decimal, int, mysqlEnum, mysqlTable, primaryKey, text, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { InferInsertModel, relations } from 'drizzle-orm';

/*        ENTITY DEFINITIONS        */

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

export const items = mysqlTable('item', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  creatorId: int('creator_id').references(() => users.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  url: varchar('url', { length: 1000 }),
  imageUrl: varchar('image_url', { length: 500 }),
  company: varchar('brand', { length: 100 }),
  price: decimal('price', { precision: 8, scale: 2 }).$type<number>(),
  isForSale: boolean('is_for_sale').notNull().default(false),
  isForTrade: boolean('is_for_trade').notNull().default(false),
});

export const itemsToUsersCollections = mysqlTable('item_to_user_collection', {
  itemId: int('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isHidden: boolean('is_visible').notNull().default(false),
  notes: text('notes'),
}, table => ({
  pk: primaryKey({ columns: [table.itemId, table.userId] }),
}));

export const itemsToUsersWishlists = mysqlTable('item_to_user_wishlist', {
  itemId: int('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isHidden: boolean('is_visible').notNull().default(false),
  notes: text('notes'),
}, table => ({
  pk: primaryKey({ columns: [table.itemId, table.userId] }),
}));

export const itemsToTags = mysqlTable('item_to_tag', {
  itemId: int('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  tagId: int('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, table => ({
  pk: primaryKey({ columns: [table.itemId, table.tagId] }),
}));

/*        ENTITY RELATIONS        */

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

export const itemsRelations = relations(items, ({ one, many }) => ({
  creator: one(users, {
    fields: [items.creatorId],
    references: [users.id],
  }),
  collection: one(itemsToUsersCollections, {
    fields: [items.id],
    references: [itemsToUsersCollections.itemId],
  }),
  wishlists: many(itemsToUsersWishlists),
  tags: many(itemsToTags),
}));

export const itemsToUsersCollectionsRelations = relations(itemsToUsersCollections, ({ one }) => ({
  item: one(items, {
    fields: [itemsToUsersCollections.itemId],
    references: [items.id],
  }),
  user: one(users, {
    fields: [itemsToUsersCollections.userId],
    references: [users.id],
  }),
}));

export const itemsToUsersWishlistsRelations = relations(itemsToUsersWishlists, ({ one }) => ({
  item: one(items, {
    fields: [itemsToUsersWishlists.itemId],
    references: [items.id],
  }),
  user: one(users, {
    fields: [itemsToUsersWishlists.userId],
    references: [users.id],
  }),
}));

export const itemsToTagsRelations = relations(itemsToTags, ({ one }) => ({
  item: one(items, {
    fields: [itemsToTags.itemId],
    references: [items.id],
  }),
  tag: one(tags, {
    fields: [itemsToTags.tagId],
    references: [tags.id],
  }),
}));

/*        ENTITY TYPES        */

export type UsersType = InferInsertModel<typeof users>;
export type TagsType = InferInsertModel<typeof tags>;
export type UsersToTagsType = InferInsertModel<typeof usersToTags>;
export type FriendshipsType = InferInsertModel<typeof friendships>;
export type ItemsType = InferInsertModel<typeof items>;
export type ItemsToUsersCollectionsType = InferInsertModel<typeof itemsToUsersCollections>;
export type ItemsToUsersWishlistsType = InferInsertModel<typeof itemsToUsersWishlists>;
export type ItemsToTagsType = InferInsertModel<typeof itemsToTags>;
