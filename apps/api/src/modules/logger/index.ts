import winston from 'winston';
import { ConsoleTransporter, ErrorFileTransporter, LogFileTransporter } from './transporters';

export const logger = winston.createLogger({
  defaultMeta: { environment: process.env.NODE_ENV },
  transports: [
    ConsoleTransporter,
    LogFileTransporter,
    ErrorFileTransporter,
  ],
});
