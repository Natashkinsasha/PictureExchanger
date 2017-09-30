import JwtRedis from 'jwt-redis';
import Promise from 'bluebird';

import MongoDB from './lib/MongoDb';
import RedisClient from './lib/RedisClient';
import App from './modules/App';
import HttpServer from './modules/HttpServer';
import logger from './lib/logger';

import passportAuthenticate from './middleware/passportAuthenticate';

import AuthRouter from './router/AuthRouter';
import BasicRouter from './router/BasicRouter';
import InfoRouter from './router/InfoRouter';
import MongoRouter from './router/MongoRouter';
import PictureRouter from './router/PictureRouter';
import RedisRouter from './router/RedisRouter';

import AuthController from './controller/AuthController';
import MongoController from './controller/MongoController';
import PictureController from './controller/PictureController';
import RedisController from './controller/RedisController';

import AuthService from './service/AuthService';
import JwtService from './service/JwtService';
import PictureService from './service/PictureService';
import PictureStorageService from './service/PictureStorageService';
import MongoService from './service/MongoService';
import RedisService from './service/RedisService';

import MongoDao from './dao/MongoDao';
import PictureDao from './dao/PictureDAO';
import RedisDao from './dao/RedisDao';
import UserDao from './dao/UserDao';

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', err.stack);
});

const redisClient = new RedisClient();
const db = new MongoDB();

//--------dao--------
const mongoDao = new MongoDao({db});
const redisDao = new RedisDao({redisClient});
const pictureDao = new PictureDao({db});
const userDao = new UserDao({db});
//-------------------

const jwtRedis = Promise.promisifyAll(new JwtRedis(redisClient));
const passport = passportAuthenticate({jwtRedis});

//----service-------
const jwtService = new JwtService({jwtRedis});
const authService = new AuthService({jwtService, userDao});
const pictureStorageService = new PictureStorageService();
const pictureService = new PictureService({pictureDao, pictureStorageService});
const mongoService = new MongoService({mongoDao});
const redisService = new RedisService({redisDao});
//------------------

//---controller------
const authController = new AuthController({authService});
const mongoController = new MongoController({mongoService});
const pictureController = new PictureController({pictureService});
const redisController = new RedisController({redisService});
//-------------------

//------router-------
const authRouter = new AuthRouter({authController, passport});
const infoRouter = new InfoRouter();
const mongoRouter = new MongoRouter({mongoController});
const pictureRouter = new PictureRouter({pictureController});
const redisRouter = new RedisRouter({redisController});
const basicRouter = new BasicRouter({ authRouter, infoRouter, mongoRouter, redisRouter, pictureRouter });
//-------------------


const app = new App({ basicRouter, passport });
const httpSever = new HttpServer(app);
httpSever.start();

