import type { drizzle } from 'drizzle-orm/mysql2';
import * as session from 'express-session';

import express from 'express';

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

export class BaseService {
  /**
    * The service's main router.
    *
    * The router is an express middleware that is used route requests
    * to a controller based on the path.
    *
    * You define the routes using methods like `router.get`, `router.post`, etc.
    *
    * @example
    * ```typescript
    * this.router.get('/hello', (_, res) => {
    *   res.status(200).json({
    *     message: 'Hello, World!',
    *   });
    * });
    * ```
    *
    * We want our sub-classes to be able to use this router, so we make it `protected`.
    */
  protected readonly router = express.Router();

  /**
    * Used only to prefix the service routes with the service path.
    *
    * This is very ugly :)
    * We should hide this away forever! @private
    */
  private readonly prefixRouter = express.Router();

  constructor(
    protected readonly resources: Resources,
    private readonly servicePathPrefix = '/',
  ) {
    // Enable JSON parsing for request bodies.
    this.router.use(express.json());

    // Assume servicePathPrefix = '/users'
    // Assume service endpoints = '/', '/:id', '/:id/posts'
    //   - Defined in sub-classes
    //
    // Map the servicePathPrefix to the endpoints.
    // [prefixRouter: '/users'] -> [router: '/', '/:id', '/:id/posts']
    this.prefixRouter.use(this.servicePathPrefix, this.router);

    // Routes are now:
    //  - '/users/',
    //  - '/users/:id',
    //  - '/users/:id/posts'
  }

  getRouter() {
    // And now the main api server can use this router to route requests to the service.
    return this.prefixRouter;
  }
}

export type Service = typeof BaseService;
