/* eslint-disable import/order */
import classnames from "classnames";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import {ButtonType} from "../Button/constants";
import {IconAppName} from "../Icons/constants";
import type {TIconComponent, IIconProps} from "../Icons/types/icon";
import {ButtonIconVariant} from "./constants";

import Icons from "../Icons/Icons";
import styles from "./ButtonIcon.module.scss";

interface IProps {
  icon: KeyExtractor<typeof IconAppName>;
  children?: React.ReactNode;
  className?: string;
  iconProps?: IIconProps;
  type?: KeyExtractor<typeof ButtonType>;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: (() => void) | ((event: unknown) => void);
  buttonIconVariant?: KeyExtractor<typeof ButtonIconVariant>;
}

const ButtonIcon = ({
  className,
  icon,
  iconProps,
  onClick,
  ariaLabel,
  disabled = false,
  type = ButtonType.Button,
  buttonIconVariant = ButtonIconVariant.Primary,
}: IProps) => {
  const Icon: TIconComponent = Icons[icon];

  const {className: classNameIcon, ...iconPropsRest} = iconProps ?? {};

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(styles.button, styles[`${buttonIconVariant}`], className)}
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
