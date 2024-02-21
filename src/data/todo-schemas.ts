import { JSONSchema7 } from 'json-schema';

export const TodoCreationSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  required: ['title'],
  additionalProperties: false,
} as JSONSchema7;

export const TodoUpdateSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    completed: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
} as JSONSchema7;
