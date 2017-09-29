import mongodb from 'mongodb';
import Promise from 'bluebird';
import config from 'node-config-env-value';
import deasync from 'deasync';

import logger from './logger';


export default class MongoDb {

    constructor() {
        const url = config.get('mongodb.url');
        const MongoClinet = mongodb.MongoClient;
        const db = deasync(MongoClinet.connect)(url, {promiseLibrary: Promise});
        db.on('authenticated', ()=>{
            logger.info('Db authenticated');
        });
        db.on('close', () => {
            logger.warn('Db close');
        });

        db.on('error', () => {
            logger.error('Db error');
        });

        db.on('parseError', () => {
            logger.error('Db parseError');
        });

        db.on('fullsetup', ()=>{
            logger.state('Db fullsetup');
        });

        db.on('reconnect', ()=>{
            logger.warn('Db reconnect');
        });

        db.on('timeout', ()=>{
            logger.warn('Db timeout');
        });
        return db;
    }

}
