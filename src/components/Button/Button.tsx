import classnames from "classnames";

import type {KeyExtractor} from "utils/types/keyExtractor";

import styles from "./Button.module.scss";
import {ButtonType, ButtonColor, ButtonSize} from "./constants";

interface Button {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: KeyExtractor<typeof ButtonType>;
  color?: KeyExtractor<typeof ButtonColor>;
  size?: KeyExtractor<typeof ButtonSize>;
  classname?: string;
}

const Button = ({
  text,
  onClick,
  isDisabled = false,
  classname,
  color = ButtonColor.Primary,
  type = ButtonType.Button,
  size = ButtonSize.FillWidth,
}: Button) => {
  const buttonClasses = classnames(classname, styles.button, styles[`${color}`], styles[`${type}`], styles[`${size}`]);

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      type={type}
      disabled={isDisabled}
      aria-label={text}
    >
      {<span className={styles.buttonText}>{text}</span>}
    </button>
  );
};

export default Button;
