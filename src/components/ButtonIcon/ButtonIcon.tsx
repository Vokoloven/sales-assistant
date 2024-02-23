import classnames from "classnames";

import {KeyExtractor} from "utils/types/keyExtractor";

import styles from "./ButtonIcon.module.scss";
import {ButtonType} from "../Button/constants";
import {IconAppName} from "../Icons/constants";
import Icons from "../Icons/Icons";
import type {TIconComponent, IIconProps} from "../Icons/types/icon";

interface IProps {
  icon: KeyExtractor<typeof IconAppName>;
  children?: React.ReactNode;
  className?: string;
  iconProps?: IIconProps;
  type?: KeyExtractor<typeof ButtonType>;
  onClick?: () => void;
}

const ButtonIcon = ({className, icon, iconProps, onClick, type = ButtonType.Button}: IProps) => {
  const Icon: TIconComponent = Icons[icon];

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(className, styles.button)}
    >
      <Icon {...iconProps} />
    </button>
  );
};

export default ButtonIcon;
