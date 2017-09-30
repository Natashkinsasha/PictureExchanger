import errorCode from './errorCodes';
import LogicError from './LogicError';

export default class ValidationError extends LogicError {
  constructor({ message = 'Validation error', code = errorCode.LOGIC_ERROR, result = [] }) {
    super({ message, code });
    this.result = result;
  }
}
