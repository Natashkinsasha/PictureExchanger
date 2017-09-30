import errorCode from './errorCodes';

export default class LogicError extends Error {
  constructor({ message = 'Logic error', code = errorCode.LOGIC_ERROR }) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
  }
}
