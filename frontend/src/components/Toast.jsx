import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

/**
 * Toast notification component for success/error messages
 */
function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast" data-testid="toast" data-toast-type={type}>
      <div className="toast__body" data-toast-type={type}>
        <i
          className={`fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'} toast__icon`}
          data-toast-type={type}
          aria-hidden="true"
        ></i>
        <div className="toast__content">
          <p className="toast__message" data-toast-type={type}>{message}</p>
        </div>
        <button
          onClick={() => { setIsVisible(false); onClose(); }}
          className="toast__close"
          data-toast-type={type}
          aria-label="Dismiss"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

export default Toast;
