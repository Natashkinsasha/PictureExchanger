import JwtRedis from 'jwt-redis';

import MongoDB from './lib/MongoDb';
import RedisClient from './lib/RedisClient';
import App from './modules/App';
import HttpServer from './modules/HttpServer';

import AuthRouter from './router/AuthRouter';
import BasicRouter from './router/BasicRouter';
import InfoRouter from './router/InfoRouter';
import MongoRouter from './router/MongoRouter';
import RedisRouter from './router/RedisRouter';

import AuthController from './controller/AuthController';
import MongoController from './controller/MongoController';
import RedisController from './controller/RedisController';

import AuthService from './service/AuthService';
import JwtService from './service/JwtService';
import MongoService from './service/MongoService';
import RedisService from './service/RedisService';

import MongoDao from './dao/MongoDao';
import RedisDao from './dao/RedisDao';
import UserDao from './dao/UserDao';

process.on('uncaughtException', (err) => {
    log.error('Uncaught Exception', err.stack);
});

const redisClient = new RedisClient();
const db = new MongoDB();

//--------dao--------
const mongoDao = new MongoDao({db});
const redisDao = new RedisDao({redisClient});
const userDao = new UserDao({db});
//-------------------

const jwtRedis = new JwtRedis({redisClient});

//----service-------
const jwtService = new JwtService({jwtRedis});
const authService = new AuthService({jwtService, userDao});
const mongoService = new MongoService({mongoDao});
const redisService = new RedisService({redisDao});
//------------------

//---controller------
const authController = new AuthController({authService});
const mongoController = new MongoController({mongoService});
const redisController = new RedisController({redisService});
//-------------------

//------router-------
const authRouter = new AuthRouter({authController});
const infoRouter = new InfoRouter();
const mongoRouter = new MongoRouter({mongoController});
const redisRouter = new RedisRouter({redisController});
const basicRouter = new BasicRouter({ authRouter, infoRouter, mongoRouter, redisRouter });
//-------------------

const app = new App({ basicRouter });
const httpSever = new HttpServer(app);
httpSever.start();

