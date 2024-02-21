import { NextFunction, Request, Response } from 'express';

export const basicAuth = (username: string, password: string) => {
  return (req: Request, resp: Response, next: NextFunction) => {
    const sendAccessDenied = () => {
      resp.status(401).json({
        message: 'Access denied',
      });
    };

    const auth = req.headers['authorization'] || '';
    const [schema, token] = auth.split(' ');

    if (!schema || !token || schema !== 'Basic') {
      sendAccessDenied();
      return;
    }
    try {
      const b64decoded = Buffer.from(token, 'base64').toString('utf8');
      const [reqUsername, reqPassword] = b64decoded.split(':');

      if (reqUsername !== username || reqPassword !== password) {
        sendAccessDenied();
        return;
      }
      req.user = reqUsername;
    } catch (err) {
      console.error('Something went wrong authenticating', err);
      sendAccessDenied();
    }
    next();
  };
};
