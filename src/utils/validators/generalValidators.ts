import type {TRequired, TMaxLength, TMinLength, TPattern} from './types/generalValidators';

type KeyExtractor<T> = T[keyof T];
type TGeneralValidator<T> = (obj: KeyExtractor<T>) => T;

export const required: TGeneralValidator<TRequired> = ({value, message}) => ({
  required: {
    value,
    message,
  },
});
export const maxLength: TGeneralValidator<TMaxLength> = ({value, message}) => ({
  maxLength: {
    value: value,
    message: message,
  },
});

export const minLength: TGeneralValidator<TMinLength> = ({value, message}) => ({
  minLength: {
    value: value,
    message: message,
  },
});
export const pattern: TGeneralValidator<TPattern> = ({value, message}) => ({
  pattern: {
    value: value,
    message: message,
  },
});
