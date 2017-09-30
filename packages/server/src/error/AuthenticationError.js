import LogicError from './LogicError';
import errorCode from './errorCodes';

export default class AuthenticationError extends LogicError{

    constructor({message = 'AuthenticationError', code = errorCode.AUTHENTICATION_ERROR}){
        super({message, code});
    }

}