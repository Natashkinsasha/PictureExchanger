import winston from 'winston';
import config from 'node-config-env-value';

const level = config.get('server.log_level');
const ENV = config.get('NODE_ENV');

const rewriters = [
    (level, msg, meta) => ({...meta, env: ENV, timeStamp: new Date()}),
];

const levels = {
    error: 0, warn: 1, state: 2, prof: 3, info: 4, verbose: 5, debug: 6,
};


export default new (winston.Logger)({
    levels,
    level,
    rewriters,
    transports: [
        new (winston.transports.Console)(),
    ],
});
