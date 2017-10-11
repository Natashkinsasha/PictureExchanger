import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import logger from '../middleware/logger';
import errorHandler from '../middleware/errorHandler';
import validator from '../middleware/validator';
import responseTimeLogger from '../middleware/responseTimeLogger';

export default class App {
    constructor({basicRouter, passport}) {
        const app = express();
        app.use(helmet());
        app.use(passport.initialize());
        app.use(responseTimeLogger());
        app.use(logger());
        app.use(cors());
        app.use(bodyParser.json());
        app.use(validator());
        app.use('/api', basicRouter);
        app.use(errorHandler());
        return app;
    }
}
