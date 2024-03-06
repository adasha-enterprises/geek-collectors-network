import { drizzle } from 'drizzle-orm/mysql2';

import type { UserType, TagType, UserInterestTagType } from './schema';
// eslint-disable-next-line no-duplicate-imports
import { user, tag, userInterestTag } from './schema';

import { logger } from '../modules/logger';

const DUMMY_USERS: UserType[] = [
  {
    id: 1,
    email: 'dummy_a@example.org',
    salt: '123',
    hashedPassword: '423wytg234ygt',
    lastLoginAt: new Date(),
    firstName: 'Jane',
    lastName: 'Doe',
    displayName: 'DummyA',
    birthDate: new Date(),
  },
  {
    id: 2,
    email: 'dummy_b@example.org',
    salt: '123',
    hashedPassword: '423afawfwytg234ygt',
    lastLoginAt: new Date(),
    firstName: 'John',
    lastName: 'Smith',
    displayName: 'DummyB',
    birthDate: new Date(),
  },
  {
    id: 3,
    email: 'dummy_c@example.org',
    salt: '123',
    hashedPassword: '423wytg2gwegw34ygt',
    lastLoginAt: new Date(),
    firstName: 'X',
    lastName: 'Y',
    displayName: 'DummyC',
    birthDate: new Date(),
  },
];

const DUMMY_TAGS: TagType[] = [
  {
    id: 1,
    creatorId: 1,
  },
  {
    id: 2,
    creatorId: 1,
  },
  {
    id: 3,
    creatorId: 3,
  },
  {
    id: 4,
    creatorId: 2,
  },
  {
    id: 5,
    creatorId: 1,
  },
  {
    id: 6,
    creatorId: 3,
  },
];

const DUMMY_INTERESTS: UserInterestTagType[] = [
  {
    id: 1,
    userId: 1,
    tagId: 3,
  },
  {
    id: 2,
    userId: 1,
    tagId: 2,
  },
  {
    id: 3,
    userId: 2,
    tagId: 3,
  },
  {
    id: 4,
    userId: 2,
    tagId: 3,
  },
  {
    id: 5,
    userId: 3,
    tagId: 1,
  },
  {
    id: 6,
    userId: 1,
    tagId: 6,
  },
];

export const writeDummyToDb = async (db: ReturnType<typeof drizzle>) => {
  logger.info('Writing dummy data to database if it doesn\'t exist.');

  const userInsertionPromises = DUMMY_USERS.map(dummy => db.insert(user).values(dummy).execute());
  try {
    Promise.all(userInsertionPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const tagPromises = DUMMY_TAGS.map(dummy => db.insert(tag).values(dummy).execute());
  try {
    await Promise.all(tagPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const interestPromises = DUMMY_INTERESTS.map(dummy => db.insert(userInterestTag).values(dummy).execute());
  try {
    await Promise.all(interestPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }
};
