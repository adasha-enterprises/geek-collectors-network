import type { drizzle } from 'drizzle-orm/mysql2';
import * as session from 'express-session';

/**
  * Resources are the external dependencies that the service needs to function.
  *
  * These are required to be passed in to EVERY service's constructor.
  */
export type RequiredResources = {
  db: ReturnType<typeof drizzle>;
  sessions: ReturnType<typeof session.default>
};

/**
  * A superset of the RequiredResources that includes any additional resources
  * that not every service needs.
  *
  * Any additional resources will not be included in the autocomplete, therefore
  * they should be checked for existence before being used.
  *
  * =====
  * @example
  * ```typescript
  * if ('cache' in resources) {
  *   const value = resources.cache.get('key');
  *   // ...
  * }
  * ```
  * =====
  * @example
  * ```typescript
  * if (!('cache' in resources)) {
  *   logger.error('Cache not available');
  *   return res.status(500).send('Server Error'); // Exit early
  * }
  *
  * //...
  * ```
  * =====
  *
  * The utility of this is debatable, but it's here in case we want to use it.
  */
export type Resources = Readonly<RequiredResources & Record<string, unknown>>;
