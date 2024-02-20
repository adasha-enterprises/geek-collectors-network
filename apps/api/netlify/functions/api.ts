import serverless from 'serverless-http';
import { Server } from '../../src/server/server';

const { app } = new Server();

export const handler = serverless(app);
