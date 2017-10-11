import { Router } from 'express';
import queryParser from 'query-parser-express'

import multiparty from '../middleware/multiparty';
import ValidationError from '../error/ValidationError';
import errorCodes from '../error/errorCodes';

export default class PictureRouter extends Router{

    constructor({pictureController, passport}){
        super();
        return this
            .get('/', queryParser(), passport.authenticate('jwtr', {session: false}), pictureController.find)
            .post('/save', passport.authenticate('jwtr', {session: false}), multiparty(), validateSave, pictureController.save)
            .get('/tags/popular', queryParser(), pictureController.getPopularTags)
    }

}

function validateSave(req, res, next) {
    req.checkBody({
        file: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
        },
        name: {
            notEmpty: {
                errorMessage: errorCodes.REQUIRED,
            },
            isLength: {
                options: [{min: 3, max: 15}],
                errorMessage: errorCodes.INVALID_LENGTH,
            },
        },
        description: {
            isLength: {
                options: [{min: 3, max: 50}],
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