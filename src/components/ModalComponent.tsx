import React from 'react'
import { createPortal } from 'react-dom';

type ModalProps = {
    modalOpen: boolean;
    setModalOpen: any;
};

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    if (!modalOpen) return null;

    return createPortal(
        <div className="modal-wrapper clickable" onClick={(event) => setModalOpen(event)}>
            {children}
        </div>,
        document.body
    );
};

export default Modal;
