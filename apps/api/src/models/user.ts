import {
  boolean,
  varchar,
  varbinary,
  date,
  datetime,
  mysqlTable,
} from 'drizzle-orm/mysql-core';

import { v4 as uuidv4 } from 'uuid';


export const user = mysqlTable('user', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => uuidv4()),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt'),
  email: varchar('email', { length: 255 }).unique(),
  hashedPassword: varchar('hashedPassword', { length: 255 }),
  salt: varbinary('salt', { length: 16 }),
  firstName: varchar('firstName', { length: 20 }),
  lastName: varchar('lastName', { length: 20 }),
  displayName: varchar('username', { length: 20 }).unique(),
  isAdmin: boolean('isAdmin').default(false),
  profileImageUrl: varchar('profileImageUrl', { length: 255 }),
  isEmailVerified: boolean('isEmailVerified').default(false),
  lastLoginAt: datetime('lastLoginAt'),
  birthDate: date('birthDate'),
});
