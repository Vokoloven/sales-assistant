import {ReactNode, useRef, useEffect, useCallback, ElementRef} from "react";
import {createPortal} from "react-dom";

import {ModalProps} from "../components/Modal/Modal";
import Modal from "../components/Modal/Modal";

export type UseModalResp = {
  modal: ReactNode;
  closeModal: () => void;
  openModal: () => void;
};

export type UseModalProps = Omit<ModalProps, "onBackdropClick"> & {
  shouldAllowBackdropClick?: boolean;
  onModalOpen?: () => void;
  onModalClose?: () => void;
  isRenderInPortal?: {domNode: HTMLElement};
  isCloseModalOnClick?: boolean;
};

export const useModal = ({
  children,
  isRenderInPortal,
  onModalClose,
  onModalOpen,
  isCloseModalOnClick = false,
}: UseModalProps): UseModalResp => {
  const ref = useRef<ElementRef<"dialog">>(null);

  const closeModal = () => {
    onModalClose && onModalClose();
    ref.current?.close();
  };

  const openModal = () => {
    onModalOpen && onModalOpen();
    ref.current?.showModal();
  };

  const handleBackdropClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target instanceof HTMLDialogElement) {
      closeModal();
    }
  }, []);

  useEffect(() => {
    if (!isCloseModalOnClick) {
      return;
    }

    document.addEventListener("mousedown", handleBackdropClick);

    return () => document.removeEventListener("mousedown", handleBackdropClick);
  }, [handleBackdropClick]);

  const modalPortal: ReactNode =
    isRenderInPortal && createPortal(<Modal ref={ref}>{children}</Modal>, isRenderInPortal?.domNode);

  const modal: ReactNode = <Modal ref={ref}>{children}</Modal>;

  return {
    closeModal,
    openModal,
    modal: isRenderInPortal ? modalPortal : modal,
  };
};
