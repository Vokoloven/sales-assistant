import {forwardRef, ReactNode} from "react";

import styles from "./Modal.module.scss";

export type ModalProps = {
  children?: ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({children}, ref) => {
  return (
    <dialog
      ref={ref}
      className={styles.backdrop}
    >
      <div className={styles.modal}>{children}</div>
      <form method="dialog"></form>
    </dialog>
  );
});

export default Modal;
