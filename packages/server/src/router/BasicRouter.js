import {Router} from 'express';

export default class BasicRouter extends Router {
    constructor({redisRouter, mongoRouter, infoRouter, authRouter}) {
        super();
        return this
            .use('/redis', redisRouter)
            .use('/mongo', mongoRouter)
            .use('/info', infoRouter)
            .use('/auth', authRouter)
    }
}
