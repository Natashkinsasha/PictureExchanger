import { Router } from 'express';

export default class MongoRouter extends Router {
  constructor({ mongoController }) {
    super();
    return this
      .delete('/clear', mongoController.clear)
      .delete('/remove', mongoController.remove)
  }
}
