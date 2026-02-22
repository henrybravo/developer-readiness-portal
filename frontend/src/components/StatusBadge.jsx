import './StatusBadge.css';
import PropTypes from 'prop-types';

/**
 * Displays a colored badge indicating team readiness status
 */
function StatusBadge({ status }) {
  const getStatusText = () => {
    if (status === 2 || status === 'Green') return 'Green';
    if (status === 1 || status === 'Yellow') return 'Yellow';
    if (status === 0 || status === 'Red') return 'Red';
    return 'Unknown';
  };

  return (
    <span
      className="status-badge"
      data-testid="status-badge"
      data-status={getStatusText().toLowerCase()}
    >
      <i className="fa-solid fa-circle status-badge__dot" aria-hidden="true"></i>
      {getStatusText()}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatusBadge;
