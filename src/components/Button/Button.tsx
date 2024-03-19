import classnames from "classnames";

import type {KeyExtractor} from "../../utils/types/keyExtractor";
import {IconAppName} from "../Icons/constants";
import Icons from "../Icons/Icons";
import type {TIconComponent} from "../Icons/types/icon";

import styles from "./Button.module.scss";
import {ButtonType, ButtonStyle, ButtonSize} from "./constants";

interface Button {
  text: string | number;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: KeyExtractor<typeof ButtonType>;
  style?: KeyExtractor<typeof ButtonStyle>;
  size?: KeyExtractor<typeof ButtonSize>;
  iconBefore?: KeyExtractor<typeof IconAppName>;
  iconAfter?: KeyExtractor<typeof IconAppName>;
  spinner?: JSX.Element;
  isLoading?: boolean;
}

const Button = ({
  text,
  onClick,
  iconAfter,
  iconBefore,
  spinner,
  isLoading = false,
  isDisabled = false,
  style,
  type = ButtonType.Button,
  size = ButtonSize.FillWidth,
}: Button) => {
  const IconBefore: TIconComponent | undefined = iconBefore && Icons[iconBefore];
  const IconAfter: TIconComponent | undefined = iconAfter && Icons[iconAfter];

  return (
    <button
      onClick={onClick}
      className={classnames(styles.button, styles[`${size}`], styles[`button${style}`])}
      type={type}
      disabled={isDisabled || isLoading}
    >
      {IconBefore && (
        <div className={classnames(styles.buttonIconWrapper, styles[`button${style}IconWrapper`])}>
          <IconBefore />
        </div>
      )}
      {isLoading ? spinner : null}
      <span className={classnames(styles.buttonText, styles[`button${style}Text`])}>{text}</span>
      {IconAfter && (
        <div className={classnames(styles.buttonIconWrapper, styles[`button${style}IconWrapper`])}>
          <IconAfter />
        </div>
      )}
    </button>
  );
};

export default Button;
