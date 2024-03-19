import classnames from "classnames";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import {ButtonType} from "../Button/constants";
import {IconAppName} from "../Icons/constants";
import Icons from "../Icons/Icons";
import type {TIconComponent} from "../Icons/types/icon";

import styles from "./ButtonIcon.module.scss";
import {ButtonIconStyle} from "./constants";

interface IProps {
  icon: KeyExtractor<typeof IconAppName>;
  children?: React.ReactNode;
  type?: KeyExtractor<typeof ButtonType>;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: (() => void) | ((event: unknown) => void);
  buttonIconStyle?: KeyExtractor<typeof ButtonIconStyle>;
}

const ButtonIcon = ({
  icon,
  onClick,
  ariaLabel,
  disabled = false,
  type = ButtonType.Button,
  buttonIconStyle,
}: IProps) => {
  const Icon: TIconComponent = Icons[icon];

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(styles.button, styles[`button${buttonIconStyle}`])}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <Icon className={classnames(styles.buttonIcon, styles[`button${buttonIconStyle}Icon`])} />
    </button>
  );
};

export default ButtonIcon;
