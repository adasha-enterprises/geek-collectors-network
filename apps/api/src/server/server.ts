import express from 'express';

// Middleware
import helmet from 'helmet';
import morgan from 'morgan';

import { Service, Resources } from './services/Service';

import { logger } from '../modules/logger';

enum VERSIONS {
  API_V1 = '/api/v1',
}

export class Server {
  public static readonly VERSIONS = VERSIONS;

  public readonly app: express.Application;
  private server: ReturnType<express.Application['listen']> | null = null;

  constructor() {
    this.app = express();

    this.app.use(helmet());
    this.app.use(morgan('combined', {
      stream: {
        write: (msg: string) => logger.info(msg.trim()),
      },
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));


    this.app.get('/health', (_, res) => res.status(200).json({
      msg: 'OK',
    }));
  }

  public start(host: string, port: number): void {
    this.server = this.app.listen(port, host, () => {
      logger.info(`Server running at http://${host}:${port}`);
    });
  }

  public stop() {
    this.server?.close();
  }

  public addServices(version: VERSIONS, services: Service[], resources: Resources): void {
    services.forEach(service => {
      const serviceInstance = new service(resources);
      const router = serviceInstance.getRouter();

      this.app.use(version, router);
    });
  }
}
