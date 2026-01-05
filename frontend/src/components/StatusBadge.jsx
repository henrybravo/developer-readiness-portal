import PropTypes from 'prop-types';

/**
 * Displays a colored badge indicating team readiness status
 */
function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Green':
      case 2:
        return 'bg-green-100 text-green-600 border-green-200';
      case 'Yellow':
      case 1:
        return 'bg-yellow-100 text-yellow-500 border-yellow-200';
      case 'Red':
      case 0:
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = () => {
    if (status === 2 || status === 'Green') return 'Green';
    if (status === 1 || status === 'Yellow') return 'Yellow';
    if (status === 0 || status === 'Red') return 'Red';
    return 'Unknown';
  };

  return (
    <span 
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border-2 shadow-sm ${getStatusStyles()}`}
      data-testid="status-badge"
      data-status={getStatusText().toLowerCase()}
    >
      <span className="w-2.5 h-2.5 rounded-full mr-2 bg-current"></span>
      {getStatusText()}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatusBadge;
