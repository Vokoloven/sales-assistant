import classnames from 'classnames';

import {getTheme} from '@/hooks/useTheme';
import type {KeyExtractor} from '@/utils/types/keyExtractor';

import styles from './Button.module.scss';
import {ButtonType, ButtonColor, ButtonSize} from './constants';

interface Button {
  text: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: KeyExtractor<typeof ButtonType>;
  color?: KeyExtractor<typeof ButtonColor>;
  size?: KeyExtractor<typeof ButtonSize>;
}

const Button = ({
  text,
  onClick,
  isDisabled = false,
  color = ButtonColor.Primary,
  type = ButtonType.Button,
  size = ButtonSize.FillWidth,
}: Button) => {
  const theme = getTheme();
  const buttonClasses = classnames(
    styles.button,
    styles[`${color}`],
    styles[`${type}`],
    styles[`${size}`],
    styles[`${theme}`],
  );

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      type={type}
      disabled={isDisabled}
      aria-label={text}
    >
      {<span className={styles.Text}>{text}</span>}
    </button>
  );
};

export default Button;
