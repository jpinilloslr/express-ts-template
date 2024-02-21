import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from '../services/authentication';

export const basicAuth = (req: Request, resp: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] || '';
  const session = _validateAuthHeader(auth);
  if (session) {
    req.user = session.username;
    next();
  } else {
    resp.status(401).json({
      message: 'Access denied',
    });
  }
};

const _validateAuthHeader = (
  authHeader: string,
): { username: string } | null => {
  const [schema, token] = authHeader.split(' ');

  if (!schema || !token || schema !== 'Basic') {
    return null;
  }

  try {
    const b64decoded = Buffer.from(token, 'base64').toString('utf8');
    const [username, password] = b64decoded.split(':');
    AuthenticationService.authenticate(username, password);

    return {
      username,
    };
  } catch (err) {
    console.error('Something went wrong authenticating', err);
    return null;
  }
};
