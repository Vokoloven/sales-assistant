import type {UseFormRegister, FieldValues, Path} from "react-hook-form";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import type {TCombineGeneralValidatorResult} from "../../utils/validators/types/composeValidators";
import type {TValidatorReturn} from "../../utils/validators/types/validator";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import {IconAppName} from "../Icons/constants";

import {InputType} from "./constants";
import styles from "./Input.module.scss";

interface IProps<T extends FieldValues> {
  id: string;
  name: Path<T>;
  type: KeyExtractor<typeof InputType>;
  placeholder?: string;
  isDisabled?: boolean;
  hasAutoFocus?: boolean;
  label?: string;
  value?: string | number;
  register: UseFormRegister<T>;
  errorMessage?: string | undefined;
  validate: TValidatorReturn<TCombineGeneralValidatorResult>;
  isDirtyPassword?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  errorMessage,
  validate,
  isDirtyPassword,
  value,
  placeholder,
  onChange,
  hasAutoFocus = false,
  isDisabled = false,
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
          value={value}
          {...register(name, validate())}
          disabled={isDisabled}
          autoFocus={hasAutoFocus}
          autoComplete="off"
          placeholder={placeholder}
          onChange={onChange}
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
