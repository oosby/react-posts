import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const noop = () => {};

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, handleModalClose, isVisible } = this.props;
    return (
      <div className={isVisible ? 'active' : 'hidden'}>
        <div className="modal-background"></div>
        <div className="modal">
          <span className="close" onClick={handleModalClose} />
          {children}
        </div>
      </div>
    );
  }
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  isVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
};

Modal.defaultProps = {
  isVisible: false,
  handleModalClose: noop,
};

export default Modal;
