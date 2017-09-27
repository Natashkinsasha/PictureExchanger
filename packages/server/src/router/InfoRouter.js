import { Router } from 'express';

export default class InfoRouter extends Router {
  constructor() {
    super();
    return this
      .get('/time', (req, res, next) => res.status(200).json(new Date()));
  }
}
