import { type Resources } from './services/Service';

import express from 'express';

// Middleware
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { pagination } from './middleware/PaginationMiddleware';

import { DEFAULT_PAGE, DEFAULT_LIMIT, sendResponse } from './routes/utils';
import { logger } from '../modules/logger';
import path from 'path';

const { WEB_ROOT } = process.env;

export class Server {
  public readonly app: express.Application;
  private server: ReturnType<express.Application['listen']> | null = null;

  constructor(resources: Resources, routes: Record<string, express.Router>) {
    this.app = express();

    this.app.use(resources.sessions);
    this.app.use(pagination(DEFAULT_PAGE, DEFAULT_LIMIT));
    this.app.use(helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'development' ? false : {
        directives: {
          'script-src': ['\'self\''],
          'img-src': ['\'self\'', 'data:', 'https://ggr-images.s3-us-west-2.amazonaws.com'],
          'connect-src': ['\'self\''],
        },
      },
    }));
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

    if (WEB_ROOT) {
      this.app.use(express.static(WEB_ROOT)); // Load assets from the WEB_ROOT folder
      this.app.get('*', (_, res) => res.sendFile(path.resolve(WEB_ROOT, 'index.html'))); // Send all unhandled GET requests to react-router
    }

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
