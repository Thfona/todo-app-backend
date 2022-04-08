import Joi, { Schema } from 'joi';
import { ErrorMessageUtil } from './error-message.util';
import { ParsedValidationResult } from '../interfaces/parsed-validation-result.interface';

type SchemaNameType = 'todo';

type SchemaObjectType = { [T in SchemaNameType]: Joi.ObjectSchema<any> };

export class ValidatorUtil {
  private static schemas: SchemaObjectType = {
    todo: Joi.object({
      title: Joi.string().required().min(3),
      description: Joi.string().required().min(6).max(4096)
    })
  };

  public static validate(schemaName: SchemaNameType, data: unknown): ParsedValidationResult {
    const schema: Schema = this.schemas[schemaName];

    const validation = schema.validate(data);

    const parsedErrorMessage =
      validation.error &&
      validation.error.details &&
      validation.error.details[0] &&
      validation.error.details[0].message &&
      ErrorMessageUtil.parseErrorMessage(validation.error.details[0].message);

    return {
      ...validation,
      parsedErrorMessage: parsedErrorMessage || ''
    };
  }
}
