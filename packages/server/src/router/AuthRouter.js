import {Router} from 'express';
import ValidationError from '../error/ValidationError';
import errorCodes from '../error/errorCodes';

export default class AuthRouter extends Router {

    constructor({authController, passport}) {
        super();
        this
            .post('/registry', validateRegistry, authController.registry)
            .post('/login', validateLogin, authController.login)
            .get('/logout', passport.authenticate('jwtr', {session: false}), authController.logout)
            .post('/update', authController.getAccessToken)
    }

}

function validateRegistry(req, res, next) {
    req.checkBody({
        nickname: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
            isLength: {
                options: [{min: 3, max: 15}],
                errorMessage: errorCodes.INVALID_LENGTH,
            },
        },
        email: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
            isEmail: {
                errorCodes: errorCodes.INVALID_EMAIL,
            },
        },
        password: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
            isLength: {
                options: [{min: 3, max: 15}],
                errorMessage: errorCodes.INVALID_LENGTH,
            },
        },
    });
    return req.getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                return next();
            }
            throw new ValidationError({result: result.array()});
        })
        .catch(next);
}


function validateLogin(req, res, next) {
    req.checkBody({
        nicknameOrEmail: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
        },
        password: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
            isLength: {
                options: [{min: 3, max: 15}],
                errorMessage: errorCodes.INVALID_LENGTH,
            },
        },
    });
    return req.getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                return next();
            }
            throw new ValidationError({result: result.array()});
        })
        .catch(next);
}

