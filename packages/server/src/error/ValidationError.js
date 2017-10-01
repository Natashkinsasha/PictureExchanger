import errorCode from './errorCodes';
import LogicError from './LogicError';

export default class ValidationError extends LogicError {
  constructor({ message = 'Validation error', code = errorCode.VALIDATION_ERROR, result = [] }) {
    super({ message, code });
    this.result = result;
  }
}
