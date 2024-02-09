/* eslint-disable prefer-destructuring */

import path from 'path';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { Server } from './server/server';
import { Service, type Resources } from './server/services/Service';
import { HelloWorldService } from './server/services/HelloWorldService';

import { logger } from './modules/logger';

(async () => {
  /* ====== DATABASE ====== */

  const POSTGRES_HOST = process.env.POSTGRES_HOST;
  const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432', 10);
  const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
  const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
  const POSTGRES_DB = process.env.POSTGRES_DB;

  const migrationsFolder = path.join(__dirname, '..', 'drizzle');
  const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

  const client = postgres(connectionString);
  const db = drizzle(client);

  await migrate(db, { migrationsFolder });

  /* ====== SERVER ====== */

  const HOST: string = process.env.API_HOST || '0.0.0.0';
  const PORT: number = parseInt(process.env.API_PORT || '3000', 10);

  if (!process.env.API_HOST) logger.warn('No API_HOST environment variable detected. Defaulting to 0.0.0.0');
  if (!process.env.API_PORT) logger.warn('No API_PORT environment variable detected. Defaulting to 3000');

  const server = new Server();

  const resources: Resources = { db };

  const v1Routes: Service[] = [HelloWorldService];

  server.addServices(Server.VERSIONS.API_V1, v1Routes, resources);
  server.start(HOST, PORT);

  process.on('SIGINT', () => {
    server.stop();
    client.end();
    process.exitCode = 0;
  });
})();
