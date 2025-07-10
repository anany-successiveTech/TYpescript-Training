import React, { ReactNode } from "react";
type ModalPorps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
const Modal = ({ isOpen, onClose, children }: ModalPorps) => {
  if (!isOpen) return null;
  return (
    <div data-testid="modal-backdrop" className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button onClick={onClose} data-testid="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
