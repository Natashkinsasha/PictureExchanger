import errorCode from './errorCode';
import LogicError from './LogicError';

export default class ValidationError extends LogicError {
  constructor({ message = 'Logic error', code = errorCode.LOGIC_ERROR, result = [] }) {
    super({ message, code });
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.result = result;
  }
}
