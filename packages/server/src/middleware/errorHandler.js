import Promise from 'bluebird';
import shortid from 'shortid';
import {JsonWebTokenError, NotBeforeError, TokenExpiredError} from 'passport-jwtr';

import ValidationError from '../error/ValidationError';
import AuthenticationError from '../error/AuthenticationError';
import errorCodes from '../error/errorCodes';
import logger from '../lib/logger';


export default () => (err, req, res, next) => {
    const failureId = shortid.generate();
    return Promise
        .reject(err)
        .catch(
            (err)=>{
                return err instanceof JsonWebTokenError && err.message === 'destroyed jwt';
            },
            (err) => {
                logger.warn({
                    name: err.name,
                    stack: err.stack,
                    message: err.message,
                    code: errorCodes.DESTROYED_TOKEN,
                    failureId,
                });
                return res
                    .status(401)
                    .json({
                        name: err.name,
                        code: errorCodes.DESTROYED_TOKEN,
                        message: err.message,
                        failureId,
                    });
            },
        )
        .catch(
            JsonWebTokenError,
            (err) => {
                logger.warn({
                    name: err.name,
                    stack: err.stack,
                    message: err.message,
                    code: errorCodes.TOKEN_ERROR,
                    failureId,
                });
                return res
                    .status(401)
                    .json({
                        name: err.name,
                        code: errorCodes.TOKEN_EXPIRED,
                        message: err.message,
                        failureId,
                    });
            },
        )
        .catch(
            NotBeforeError,
            (err) => {
                logger.warn({
                    name: err.name,
                    stack: err.stack,
                    message: err.message,
                    code: errorCodes.TOKEN_NOT_ACTIVE,
                    failureId,
                });
                return res
                    .status(401)
                    .json({
                        name: err.name,
                        code: errorCodes.TOKEN_EXPIRED,
                        message: err.message,
                        failureId,
                    });
            },
        )
        .catch(
            TokenExpiredError,
            (err) => {
                logger.warn({
                    name: err.name,
                    stack: err.stack,
                    message: err.message,
                    code: errorCodes.TOKEN_EXPIRED,
                    failureId,
                });
                return res
                    .status(401)
                    .json({
                        name: err.name,
                        code: errorCodes.TOKEN_EXPIRED,
                        message: err.message,
                        failureId,
                    });
            },
        )
        .catch(ValidationError, (err) => {
            logger.warn({
                name: err.name,
                message: err.message,
                stack: err.stack,
                code: err.code,
                result: err.result,
                failureId,
            });
            return res.status(400).json({
                name: err.name,
                message: err.message,
                code: err.code,
                result: err.result,
                failureId,
            });
        })
        .catch(AuthenticationError, (err) => {
            logger.warn({
                name: err.name,
                message: err.message,
                stack: err.stack,
                code: err.code,
                failureId,
            });
            return res.status(401).json({
                name: err.name,
                message: err.message,
                code: err.code,
                failureId,
            });
        })
        .catch((err) => {
            logger.error({
                name: err.name,
                message: err.message,
                stack: err.stack,
                code: err.code,
                failureId,
            });
            return res.status(500).json({
                name: err.name,
                message: err.message,
                code: err.code,
                failureId,
            });
        });
}

