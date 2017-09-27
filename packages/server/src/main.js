import mongodb from 'mongodb';
import Promise from 'bluebird';
import config from 'node-config-env-value';
import deasync from 'deasync';

// import logger from './lib/logger';

import App from './modules/App';
import HttpServer from './modules/HttpServer';
import BasicRouter from './router/BasicRouter';
import InfoRouter from './router/InfoRouter';

const url = config.get('mongodb.url');
const MongoClinet = mongodb.MongoClient;

const db = deasync(MongoClinet.connect)(url, { promiseLibrary: Promise });

const infoRouter = new InfoRouter();
const basicRouter = new BasicRouter({ infoRouter });
const app = new App({ basicRouter });
const httpSever = new HttpServer(app);
httpSever.start();

