import winston from 'winston';
import config from 'node-config-env-value';

const level = config.get('level');

const levels = {
  error: 0, warn: 1, state: 2, info: 3, verbose: 4, debug: 5, silly: 6,
};


export default new (winston.Logger)({
  levels,
  level,
  transports: [
    new (winston.transports.Console)(),
  ],
});
