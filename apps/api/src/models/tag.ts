import {
  boolean,
  varchar,
  varbinary,
  date,
  datetime,
  mysqlTable,
  serial,
} from 'drizzle-orm/mysql-core';

import { v4 as uuidv4 } from 'uuid';
import { user } from './user';


export const tag = mysqlTable('tag', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => uuidv4()),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt'),
  creatorId: serial('creatorId').references(() => user.id),
});

export const userInterestTag = mysqlTable('userInterestTag', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => uuidv4()),
  userId: serial('userId').references(() => user.id),
  tagId: varchar('tagId', { length: 128 }).references(() => tag.id),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt'),
});
