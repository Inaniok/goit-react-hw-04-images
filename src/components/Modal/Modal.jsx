import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ handleModalClose, image }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (target !== currentTarget) {
      return;
    }
    handleModalClose();
  };

  const handleKeyDown = ({ code }) => {
    if (code !== 'Escape') {
      return;
    }

    handleModalClose();
  };


    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={image} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }


Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};