import path from 'path';

import winston, { format } from 'winston';

const logDirectory = path.join(__dirname, '..', '..', '..', 'logs');
const logFilepath = path.join(logDirectory, 'info.log');
const errorLogFilepath = path.join(logDirectory, 'error.log');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatMessage = (message: any): string => {
  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2);
  }

  return message;
};

const consoleFormat = format.combine(
  format.timestamp(process.env.NODE_ENV !== 'production' ? { format: 'YYYY-MM-DD HH:mm:ss' } : undefined),
  format.errors({ stack: true }),
  format.printf(({ level, message, timestamp, stack }) => `[${timestamp}/${level.toUpperCase()}]: ${stack || formatMessage(message)}`),
);

const fileFormat = format.combine(
  format.timestamp(),
  format.json(),
);

const errorFileFormat = format.combine(
  format.errors({ stack: true }),
  fileFormat,
);

export const ConsoleTransporter = new winston.transports.Console({ format: consoleFormat, level: 'info' });
export const LogFileTransporter = new winston.transports.File({ format: fileFormat, filename: logFilepath, level: 'info' });
export const ErrorFileTransporter = new winston.transports.File({ format: errorFileFormat, filename: errorLogFilepath, level: 'error' });
