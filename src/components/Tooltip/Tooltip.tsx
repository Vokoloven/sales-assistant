import classnames from "classnames";
import {useRef, useEffect, useCallback} from "react";

import {KeyExtractor} from "../../utils/types/keyExtractor";
import Button from "../Button/Button";
import {ButtonColor} from "../Button/constants";

import {Position} from "./constants";
import styles from "./Tooltip.module.scss";
import type {TElements} from "./types/tooltip";

interface IProps {
  children: React.ReactNode;
  elements: TElements;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position?: KeyExtractor<typeof Position>;
}

const Tooltip = ({children, elements, open = false, setOpen, position = Position.Top}: IProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const handleElementsLength = (elements: TElements) => {
    if (elements.length === 2) {
      return "couple";
    } else if (elements.length > 2) {
      return "alot";
    }
    return "";
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!open || (tooltipRef.current && tooltipRef.current.contains(target))) {
        return;
      } else {
        setOpen((prevOpen) => !prevOpen);
      }
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleOnClick = (onClick?: () => void) => {
    return () => {
      if (onClick) {
        onClick();
        setOpen((prevOpen) => !prevOpen);
      }
    };
  };

  if (open)
    return (
      <div
        ref={tooltipRef}
        className={styles.wrapper}
      >
        <div className={classnames(styles.tooltip, styles[`${position}`])}>
          {elements.map((element) => (
            <Button
              key={element.id}
              color={ButtonColor.Tooltip}
              text={element.text}
              iconBefore={element.iconBefore}
              onClick={handleOnClick(element.onClick)}
              classname={classnames(styles.tooltipButton, styles[`${handleElementsLength(elements)}`])}
            />
          ))}
        </div>
        <div>{children}</div>
      </div>
    );

  return <>{children}</>;
};

export default Tooltip;
