import { Router } from 'express';

export default class MongoRouter extends Router {
  constructor({ mongoController }) {
    super();
    this.mongoController = mongoController;
    return this
      .delete('/clear', (req, res, next) => this.mongoController
        .clear()
        .then(() => res.status(200).end())
        .catch(next))
      .delete('/remove', (req, res, next) => {
        const id = req.query.id;
        return this.mongoController
          .remove(id)
          .then(() => res.status(200).end())
          .catch(next);
      });
  }
}
