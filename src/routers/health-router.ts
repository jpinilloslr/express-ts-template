import express from 'express';

export const getHealthRouter = () => {
  const router = express.Router();

  router.get('/', (_req, resp) => {
    resp.status(200).json({
      message: 'ok',
    });
  });

  return router;
};
