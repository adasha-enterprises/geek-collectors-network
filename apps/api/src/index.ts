/* eslint-disable prefer-destructuring */
import path from 'path';

import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import * as schema from './models/schema';

import * as expressSession from 'express-session';
import MySQLStore from 'express-mysql-session';

import { Server } from './server/server';
import { type Resources } from './server/services/Service';
import { Routes as v1Routes } from './server/routes/v1';

import { writeDummyToDb } from './models/dummy';
import { logger } from './modules/logger';

(async () => {
  /* ====== DATABASE ====== */
  const DATABASE_HOST = process.env.DATABASE_HOST;
  const DATABASE_PORT = parseInt(process.env.DATABASE_PORT || '3306', 10);
  const DATABASE_USER = process.env.DATABASE_USER || 'root';
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  const DATABASE_NAME = process.env.DATABASE_NAME;

  const migrationsFolder = path.join(__dirname, '..', 'drizzle');
  const connectionString = `mysql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

  console.log(connectionString);

  const client = await mysql.createConnection(connectionString);
  const db = drizzle(client, { schema, mode: 'default' });

  await migrate(db, { migrationsFolder });
  if (process.env.NODE_ENV === 'development') await writeDummyToDb(db);

  /* ====== SESSIONS ====== */
  const sessionStore = new (MySQLStore(expressSession))({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: 'SessionStore',
  });

  const sessions = expressSession.default({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  } satisfies expressSession.SessionOptions);

  /* ====== SERVER ====== */
  const HOST: string = process.env.API_HOST || '0.0.0.0';
  const PORT: number = parseInt(process.env.API_PORT || '3000', 10);

  if (!process.env.API_HOST) logger.warn('No API_HOST environment variable detected. Defaulting to 0.0.0.0');
  if (!process.env.API_PORT) logger.warn('No API_PORT environment variable detected. Defaulting to 3000');

  const resources: Resources = { db, sessions };
  const routes = {
    '/api/v1': new v1Routes(resources).create(),
  };

  const server = new Server(resources, routes);
  server.start(HOST, PORT);
})();
