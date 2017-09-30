import {Router} from 'express';

export default class BasicRouter extends Router {
    constructor({redisRouter, mongoRouter, infoRouter, authRouter, pictureRouter}) {
        super();
        return this
            .use('/redis', redisRouter)
            .use('/mongo', mongoRouter)
            .use('/info', infoRouter)
            .use('/auth', authRouter)
            .use('/picture', pictureRouter)
    }
}
