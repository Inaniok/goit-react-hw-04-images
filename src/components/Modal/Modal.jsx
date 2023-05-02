import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code !== 'Escape') {
      return;
    }

    this.props.handleModalClose();
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget !== evt.target) {
      return;
    }

    this.props.handleModalClose();
  };

  render() {
    const { image } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={image} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};