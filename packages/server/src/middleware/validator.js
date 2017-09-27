import expressValidator from 'express-validator';

const objectId = require('mongodb').ObjectID;

export default () => expressValidator({
  customValidators: {
    isObjectId: value => objectId.isValid(value),
    isArrayObjectId: value => value.reduce((result, iteam) => result && objectId.isValid(iteam), true),
  },
});
