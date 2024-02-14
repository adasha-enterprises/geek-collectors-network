import {
  boolean,
  varchar,
  varbinary,
  date,
  datetime,
  mysqlTable,
} from 'drizzle-orm/mysql-core';

import { v4 as uuidv4 } from 'uuid';
import { user } from './user';


export const tag = mysqlTable('tag', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => uuidv4()),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt'),
  createdBy: varchar('createdBy', { length: 128 }).references(() => user.id),
});

export const userInterestTag = mysqlTable('userInterestTag', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => uuidv4()),
  userId: varchar('userId', { length: 128 }).references(() => user.id),
  tagId: varchar('tagId', { length: 128 }).references(() => tag.id),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt'),
});
