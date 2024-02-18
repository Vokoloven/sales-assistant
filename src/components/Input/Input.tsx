import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

import { TCombineGeneralValidatorResult } from '@/utils/validators/types/composeValidators';

import { InputType } from './constants';
import styles from './Input.module.scss';

const { input } = styles;

interface IProps<T extends FieldValues> {
  placeholder?: string;
  isDisabled?: boolean;
  hasAutoFocus?: boolean;
  id: string;
  name: Path<T>;
  label: string;
  type: (typeof InputType)[keyof typeof InputType];
  register: UseFormRegister<T>;
  errorMessage: string | undefined;
  validate: () => TCombineGeneralValidatorResult;
}

const Input = <T extends FieldValues>({
  label,
  type,
  id,
  register,
  name,
  hasAutoFocus = false,
  isDisabled = false,
  errorMessage,
  validate,
}: IProps<T>) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={input}
        id={id}
        type={type}
        {...register(name, validate())}
        disabled={isDisabled}
        autoFocus={hasAutoFocus}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
};

export default Input;
