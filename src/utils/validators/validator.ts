import { composeValidators } from './composeValidators';
import { StringLength } from './constants';
import { EmailRegex } from './constants';
import { required, minLength, maxLength, pattern } from './generalValidators';
import type { TCombineGeneralValidatorResult } from './types/composeValidators';
import type { TValidatorReturn } from './types/validator';

const { EmailMaxLength, EmailMinLength, PasswordMaxLength, PasswordMinLength } =
  StringLength;

type TValidator = () => {
  email: TValidatorReturn<TCombineGeneralValidatorResult>;
  password: TValidatorReturn<TCombineGeneralValidatorResult>;
};

export const validator: TValidator = () => {
  const email: TValidatorReturn<TCombineGeneralValidatorResult> = () =>
    composeValidators(
      required({ value: true, message: 'This field is required' }),
      minLength({
        value: EmailMinLength,
        message: `This input must be at least ${EmailMinLength} characters long`,
      }),
      maxLength({
        value: EmailMaxLength,
        message: `This input must be no more than ${EmailMaxLength} characters long`,
      }),
      pattern({
        value: EmailRegex,
        message: 'Please enter valid email address',
      }),
    );

  const password: TValidatorReturn<TCombineGeneralValidatorResult> = () =>
    composeValidators(
      required({ value: true, message: 'This field is required' }),
      minLength({
        value: PasswordMinLength,
        message: `This input must be at least ${PasswordMinLength} characters long`,
      }),
      maxLength({
        value: PasswordMaxLength,
        message: `This input must be no more than ${PasswordMaxLength} characters long`,
      }),
    );

  return { email, password };
};
