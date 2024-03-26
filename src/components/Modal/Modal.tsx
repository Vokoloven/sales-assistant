import {useEffect} from "react";
import {createPortal} from "react-dom";

import styles from "./Modal.module.scss";

interface IProps {
  component: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
  portal?: {domeNode: HTMLElement};
}

interface KeyboardEvent extends Event {
  key: string;
}

export const Modal = ({portal, isOpen, handleClose, component}: IProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => document.body.removeEventListener("keydown", closeOnEscapeKey);
  }, []);

  if (portal) {
    if (isOpen) {
      return createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modal}>{component}</div>
        </div>,
        portal.domeNode,
      );
    }
    return null;
  }

  if (isOpen) {
    return (
      <div className={styles.backdrop}>
        <div>
          <div className={styles.modal}>{component}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
