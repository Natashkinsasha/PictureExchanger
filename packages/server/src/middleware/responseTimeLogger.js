import config from 'node-config-env-value';
import responseTime from 'response-time';

import logger from '../lib/logger';

const { critical_response_time } = config;

export default () => responseTime((req, res, time) => {
    if (time > critical_response_time) {
        logger.warn(`${req.protocol} ${req.method} ${req.originalUrl}: `, `Response time is greater than critical - ${time}`);
    }
});