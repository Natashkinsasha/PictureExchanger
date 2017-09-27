import Promise from 'bluebird';

import logger from '../lib/logger';
import ValidationError from '../error/ValidationError';

export default () => (err, req, res, next) => Promise
  .reject(err)
  .catch((err) => {
    logger.error(err);
    return res.status(500).json(err);
  });
