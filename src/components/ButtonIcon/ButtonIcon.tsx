/* eslint-disable import/order */
import classnames from "classnames";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import {ButtonType} from "../Button/constants";
import {IconAppName} from "../Icons/constants";
import type {TIconComponent, IIconProps} from "../Icons/types/icon";

import styles from "./ButtonIcon.module.scss";
import Icons from "../Icons/Icons";

interface IProps {
  icon: KeyExtractor<typeof IconAppName>;
  children?: React.ReactNode;
  className?: string;
  iconProps?: IIconProps;
  type?: KeyExtractor<typeof ButtonType>;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

const ButtonIcon = ({
  className,
  icon,
  iconProps,
  onClick,
  ariaLabel,
  disabled = false,
  type = ButtonType.Button,
}: IProps) => {
  const Icon: TIconComponent = Icons[icon];

  const {className: classNameIcon, ...iconPropsRest} = iconProps ?? {};

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(styles.button, className)}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <Icon
        {...iconPropsRest}
        className={classnames(styles.buttonIcon, classNameIcon)}
      />
    </button>
  );
};

export default ButtonIcon;
