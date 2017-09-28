import LogicError from './LogicError';
import errorCode from './errorCode';

export default class AuthenticationError extends LogicError{

    constructor({message = 'AuthenticationError', code = errorCode.AUTHENTICATION_ERROR}){
        super({message, code});
    }

}