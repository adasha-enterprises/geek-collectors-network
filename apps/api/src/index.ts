/* eslint-disable prefer-destructuring */

import path from 'path';

import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import * as session from 'express-session';
import MySQLStore from 'express-mysql-session';

import { Server } from './server/server';
import { Service, type Resources } from './server/services/Service';
import { HelloWorldService } from './server/services/HelloWorldService';
import { AuthService } from './server/services/AuthService';

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

  const client = await mysql.createConnection(connectionString);
  const db = drizzle(client);

  await migrate(db, { migrationsFolder });

  /* ====== SERVER ====== */

  const HOST: string = process.env.API_HOST || '0.0.0.0';
  const PORT: number = parseInt(process.env.API_PORT || '3000', 10);

  if (!process.env.API_HOST) logger.warn('No API_HOST environment variable detected. Defaulting to 0.0.0.0');
  if (!process.env.API_PORT) logger.warn('No API_PORT environment variable detected. Defaulting to 3000');

  const sessionStore = new (MySQLStore(session))({
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: 'SessionStore'
  });

  const sessionResource = session.default({
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  });

  const server = new Server(sessionResource);

  const resources: Resources = { db, session: sessionResource };

  const v1Routes: Service[] = [HelloWorldService, AuthService];

  server.addServices(Server.VERSIONS.API_V1, v1Routes, resources);
  server.start(HOST, PORT);
})();
