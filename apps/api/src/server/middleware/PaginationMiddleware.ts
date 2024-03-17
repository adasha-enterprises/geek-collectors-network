import express from 'express';

export const pagination = (defaultPage: number, defaultLimit: number) => (req: express.Request, _: express.Response, next: express.NextFunction) => {
  const { page = defaultPage, limit = defaultLimit } = req.query;

  req.page = Math.max(0, parseInt(page as string, 10));
  req.limit = Math.max(0, parseInt(limit as string, 10));

  if (isNaN(req.page)) req.page = page;
  if (isNaN(req.limit)) req.limit = limit;

  next();
};
