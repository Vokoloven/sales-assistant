import classnames from "classnames";

import type {KeyExtractor} from "../../utils/types/keyExtractor";
import {IconAppName} from "../Icons/constants";
import Icons from "../Icons/Icons";
import type {TIconComponent, IIconProps} from "../Icons/types/icon";

import styles from "./Button.module.scss";
import {ButtonType, ButtonColor, ButtonSize} from "./constants";

interface Button {
  text: string | number;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: KeyExtractor<typeof ButtonType>;
  color?: KeyExtractor<typeof ButtonColor>;
  size?: KeyExtractor<typeof ButtonSize>;
  classname?: string;
  iconBefore?: KeyExtractor<typeof IconAppName>;
  iconBeforeProps?: IIconProps;
  iconBeforeClassname?: string;
  iconAfter?: KeyExtractor<typeof IconAppName>;
  iconAfterProps?: IIconProps;
  iconAfterClassname?: string;
  spinner?: JSX.Element;
  isLoading?: boolean;
}

const Button = ({
  text,
  onClick,
  classname,
  iconAfter,
  iconBefore,
  iconBeforeProps,
  iconAfterProps,
  iconAfterClassname,
  iconBeforeClassname,
  spinner,
  isLoading = false,
  isDisabled = false,
  color = ButtonColor.Primary,
  type = ButtonType.Button,
  size = ButtonSize.FillWidth,
}: Button) => {
  const IconBefore: TIconComponent | undefined = iconBefore && Icons[iconBefore];
  const IconAfter: TIconComponent | undefined = iconAfter && Icons[iconAfter];

  return (
    <button
      onClick={onClick}
      className={classnames(styles.button, styles[`${color}`], styles[`${type}`], styles[`${size}`], classname)}
      type={type}
      disabled={isDisabled || isLoading}
    >
      {IconBefore && (
        <div className={classnames(styles.buttonIcon, iconBeforeClassname)}>
          <IconBefore {...iconBeforeProps} />
        </div>
      )}
      {isLoading ? spinner : null}
      <span className={styles.buttonText}>{text}</span>
      {IconAfter && (
        <div className={classnames(styles.buttonIcon, iconAfterClassname)}>
          <IconAfter {...iconAfterProps} />
        </div>
      )}
    </button>
  );
};

export default Button;
