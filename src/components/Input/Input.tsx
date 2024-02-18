import type {UseFormRegister, FieldValues, Path} from 'react-hook-form';

import {KeyExtractor} from '@/utils/types/keyExtractor';
import type {TCombineGeneralValidatorResult} from '@/utils/validators/types/composeValidators';
import type {TValidatorReturn} from '@/utils/validators/types/validator';

import {InputType} from './constants';
import styles from './Input.module.scss';

interface IProps<T extends FieldValues> {
  placeholder?: string;
  isDisabled?: boolean;
  hasAutoFocus?: boolean;
  id: string;
  name: Path<T>;
  label: string;
  type: KeyExtractor<typeof InputType>;
  register: UseFormRegister<T>;
  errorMessage: string | undefined;
  validate: TValidatorReturn<TCombineGeneralValidatorResult>;
  passwordVisibility?: {
    isDirty: boolean | undefined;
    toggler: (id: string) => void;
  };
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
  passwordVisibility,
}: IProps<T>) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label
          className={styles.inputLabel}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          id={id}
          type={type}
          {...register(name, validate())}
          disabled={isDisabled}
          autoFocus={hasAutoFocus}
          autoComplete="off"
        />
        {passwordVisibility?.isDirty && (
          <span
            onClick={() => passwordVisibility.toggler(id)}
            className={styles.inputPasswordToggler}
          ></span>
        )}
      </div>
      {errorMessage && <span className={styles.inputTextError}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
