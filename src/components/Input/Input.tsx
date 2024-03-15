import classnames from "classnames";
import type {UseFormRegister, FieldValues, Path} from "react-hook-form";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import type {TCombineGeneralValidatorResult} from "../../utils/validators/types/composeValidators";
import type {TValidatorReturn} from "../../utils/validators/types/validator";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import {ButtonIconVariant} from "../ButtonIcon/constants";
import {IconAppName} from "../Icons/constants";

import {InputType, InputStyle} from "./constants";
import styles from "./Input.module.scss";

interface IProps<T extends FieldValues> {
  id: string;
  name: Path<T>;
  type: KeyExtractor<typeof InputType>;
  placeholder?: string;
  isDisabled?: boolean;
  hasAutoFocus?: boolean;
  label?: string;
  errorMessage?: string | undefined;
  validate?: TValidatorReturn<TCombineGeneralValidatorResult>;
  register?: UseFormRegister<T>;
  value?: string | number;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forwardedRef?: React.ForwardedRef<unknown>;
  inputStyle?: KeyExtractor<typeof InputStyle>;
  buttonIcon?: {
    icon: KeyExtractor<typeof IconAppName>;
    onClick?: () => void;
    ariaLabel?: string;
  };
}

const Input = <T extends FieldValues>({
  label,
  type,
  id,
  register,
  name,
  errorMessage,
  validate,
  value,
  onChange,
  onClick,
  forwardedRef,
  inputStyle,
  buttonIcon,
  hasAutoFocus = false,
  isDisabled = false,
}: IProps<T>) => {
  const {
    onChange: registerOnChange,
    ref: registerRef,
    ...rest
  } = (register && register(name, validate && validate())) ?? {};

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
          className={classnames(styles.input, styles[`${inputStyle}`])}
          id={id}
          type={type}
          disabled={isDisabled}
          autoFocus={hasAutoFocus}
          autoComplete="off"
          value={value}
          ref={registerRef ?? (forwardedRef as React.LegacyRef<HTMLInputElement>)}
          onChange={registerOnChange ?? onChange}
          onClick={onClick}
          {...rest}
        />
        {buttonIcon && (
          <div className={styles.inputButton}>
            <ButtonIcon
              icon={buttonIcon.icon}
              onClick={buttonIcon.onClick}
              buttonIconVariant={ButtonIconVariant.Input}
              ariaLabel={buttonIcon.ariaLabel}
            />
          </div>
        )}
      </div>
      {errorMessage && <span className={styles.inputTextError}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
