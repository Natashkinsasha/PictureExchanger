import {Router} from 'express';

export default class AuthRouter extends Router{

    constructor({authController}){
        super();
        this
            .post('/registry', authController.registry)
            .post('/login', authController.login)
            .get('/logout', authController.logout)
    }

}
