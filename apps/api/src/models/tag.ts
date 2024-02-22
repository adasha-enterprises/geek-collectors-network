import {
  int,
  mysqlTable,
  timestamp,
} from 'drizzle-orm/mysql-core';

import { user } from './user';


export const tag = mysqlTable('tag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  creatorId: int('creatorId').references(() => user.id),
});

export const userInterestTag = mysqlTable('userInterestTag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  userId: int('userId').references(() => user.id),
  tagId: int('tagId').references(() => tag.id),
});
