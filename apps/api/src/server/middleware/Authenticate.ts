import { RequestHandler } from 'express';

export const authenticate: RequestHandler = (req, res, next) => {
  const { authenticated } = req.session;

  if (authenticated) {
    return next();
  }

  return res.status(400).json({
    message: 'User is not authenticated',
  });
};
