import Redis from 'ioredis';
import config from 'node-config-env-value';
import deasync from 'deasync'

import logger from '../lib/logger';

export default class RedisClient{
    constructor(){
        const {host, port} = config.get('redis');

        const redisClient = new Redis({host, port});

        redisClient.on('connect', () => {
            logger.info(`RedisClient connect to port ${port} and host ${host}`);
        });

        redisClient.on('error', (err) => {
            logger.state(`Redis error: ${err.stack}`);
        });

        redisClient.on('close', () => {
            logger.warn('RedisClient close');
        });

        redisClient.on('reconnecting', () => {
            logger.warn('RedisClient reconnecting');
        });

        redisClient.on('end', () => {
            logger.warn('RedisClient end');
        });

        let done = false;
        redisClient.on('ready', () => {
            done = true;
            logger.state('RedisClient ready');
        });
        deasync.loopWhile(()=>(!done));

        return redisClient;
    }
}
