import { Router } from 'express';

export default class RedisRouter extends Router {
  constructor({ redisController }) {
    super();
    this.redisController = redisController;
    return this
      .delete('/clear', (req, res, next) => this.redisController
        .clear()
        .then(() => res.status(200).end())
        .catch(next))
      .delete('/remove', (req, res, next) => {
        const key = req.query.id;
        return this.redisController
          .remove({ key })
          .then(() => res.status(200).end())
          .catch(next);
      });
  }
}
