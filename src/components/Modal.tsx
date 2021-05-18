import React from 'react'
import { createPortal } from 'react-dom';

type ModalProps = {
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return createPortal(
        <div className="modal-wrapper clickable" onClick={onClose}>
            {children}
        </div>,
        document.body
    );
};

export default Modal;
