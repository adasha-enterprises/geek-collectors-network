import { type Resources } from './services/Service';

import express from 'express';

// Middleware
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { pagination } from './middleware/PaginationMiddleware';

import { DEFAULT_PAGE, DEFAULT_LIMIT, sendResponse } from './routes/utils';
import { logger } from '../modules/logger';

export class Server {
  public readonly app: express.Application;
  private server: ReturnType<express.Application['listen']> | null = null;

  constructor(resources: Resources, routes: Record<string, express.Router>) {
    this.app = express();

    this.app.use(resources.sessions);
    this.app.use(pagination(DEFAULT_PAGE, DEFAULT_LIMIT));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('combined', {
      stream: {
        write: (msg: string) => logger.info(msg.trim()),
      },
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    Object.entries(routes).forEach(([route, router]) => {
      this.app.use(route, router);
    });

    this.app.get('/health', sendResponse(200, 'OK!'));
    this.app.use('*', sendResponse(404, new Error('Route Not Found')));
  }

  public start(host: string, port: number): void {
    this.server = this.app.listen(port, host, () => {
      logger.info(`Server running at http://${host}:${port}`);
    });
  }

  public stop() {
    this.server?.close();
  }
}
