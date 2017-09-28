import { Router } from 'express';

export default class RedisRouter extends Router {
  constructor({ redisController }) {
    super();
    return this
      .delete('/clear', redisController.clear)
      .delete('/remove', redisController.remove);
  }
}
