import type {TCombineGeneralValidator, TCombineGeneralValidatorResult} from './types/composeValidators';

type TComposeValidator = (...validators: Array<TCombineGeneralValidator>) => TCombineGeneralValidatorResult;

export const composeValidators: TComposeValidator = (...validators) =>
  validators.reduce((result, validator) => ({...result, ...validator}), {});
