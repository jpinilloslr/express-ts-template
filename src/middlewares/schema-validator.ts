import addFormats from 'ajv-formats';
import { Validator } from 'express-json-validator-middleware';

const validator = new Validator({ allErrors: true });
addFormats(validator.ajv);
export const validateSchema = validator.validate;
