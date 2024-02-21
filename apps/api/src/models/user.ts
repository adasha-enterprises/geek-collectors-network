import {
  boolean,
  varchar,
  varbinary,
  date,
  datetime,
  mysqlTable,
  serial,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  createdAt: datetime('createdAt'),
  updatedAt: datetime('updatedAt'),
  email: varchar('email', { length: 255 }).unique(),
  hashedPassword: varbinary('hashedPassword', { length: 256 }),
  salt: varbinary('salt', { length: 48 }),
  firstName: varchar('firstName', { length: 20 }),
  lastName: varchar('lastName', { length: 20 }),
  displayName: varchar('username', { length: 20 }).unique(),
  isAdmin: boolean('isAdmin').default(false),
  profileImageUrl: varchar('profileImageUrl', { length: 255 }),
  isEmailVerified: boolean('isEmailVerified').default(false),
  lastLoginAt: datetime('lastLoginAt'),
  birthDate: date('birthDate'),
});
