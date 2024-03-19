import classnames from "classnames";
import type {UseFormRegister, FieldValues, Path} from "react-hook-form";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import type {TCombineGeneralValidatorResult} from "../../utils/validators/types/composeValidators";
import type {TValidatorReturn} from "../../utils/validators/types/validator";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../ButtonIcon/constants";
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
    buttonIconStyle?: KeyExtractor<typeof ButtonIconStyle>;
    onClick?: () => void;
    ariaLabel?: string;
  };
  readOnly?: boolean;
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
  readOnly = false,
}: IProps<T>) => {
  const {
    onChange: registerOnChange,
    ref: registerRef,
    ...rest
  } = (register && register(name, validate && validate())) ?? {};

  return (
    <div className={classnames(styles.inputWrapper, styles[`input${inputStyle}Wrapper`])}>
      {label && (
        <label
          className={classnames(styles.inputLabel, styles[`input${inputStyle}Label`])}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className={classnames(styles.inputBox, styles[`input${inputStyle}Box`])}>
        <input
          className={classnames(styles.input, styles[`input${inputStyle}`])}
          id={id}
          type={type}
          disabled={isDisabled}
          autoFocus={hasAutoFocus}
          autoComplete="off"
          value={value}
          ref={registerRef ?? (forwardedRef as React.LegacyRef<HTMLInputElement>)}
          onChange={registerOnChange ?? onChange}
          onClick={onClick}
          readOnly={readOnly}
          {...rest}
        />
        {buttonIcon && (
          <div className={classnames(styles.inputButton, styles[`input${inputStyle}Button`])}>
            <ButtonIcon
              icon={buttonIcon.icon}
              onClick={buttonIcon.onClick}
              buttonIconStyle={buttonIcon.buttonIconStyle ?? ButtonIconStyle.Input}
              ariaLabel={buttonIcon.ariaLabel}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <span className={classnames(styles.inputTextError, styles[`input${inputStyle}ButtonTextError`])}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
