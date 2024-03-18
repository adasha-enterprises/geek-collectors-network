import { RequestHandler } from 'express';

import { sendResponse } from '../routes/utils';

export const authenticate: RequestHandler = (req, res, next) => {
  const { authenticated } = req.session;

  if (authenticated) {
    return next();
  }

  return sendResponse(400, new Error('User is not authenticated'))(req, res);
};
