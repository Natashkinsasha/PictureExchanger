import errorCode from './errorCode';
import LogicError from './LogicError';

export default class ValidationError extends LogicError {
  constructor({ message = 'Logic error', code = errorCode.LOGIC_ERROR, result = [] }) {
    super({ message, code });
    this.result = result;
  }
}
