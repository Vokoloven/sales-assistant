import type {UseFormRegister, FieldValues, Path} from 'react-hook-form';

import {InputType} from './constants';
import styles from './Input.module.scss';
import {KeyExtractor} from '../../utils/types/keyExtractor';
import type {TCombineGeneralValidatorResult} from '../../utils/validators/types/composeValidators';
import type {TValidatorReturn} from '../../utils/validators/types/validator';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {IconAppName} from '../Icons/constants';

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
  isDirtyPassword?: boolean;
}

const togglePasswordVisibility = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement;

  if (input.type === InputType.Password) {
    input.type = InputType.Text;
  } else {
    input.type = InputType.Password;
  }
};

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
  isDirtyPassword,
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
        {isDirtyPassword && (
          <ButtonIcon
            icon={IconAppName.ShowPassword}
            iconProps={{className: styles.inputPasswordToggler}}
            onClick={() => togglePasswordVisibility(id)}
          />
        )}
      </div>
      {errorMessage && <span className={styles.inputTextError}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
