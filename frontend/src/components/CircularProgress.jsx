import './CircularProgress.css';
import PropTypes from 'prop-types';

/**
 * Displays a horizontal progress bar with gradient fill
 */
function CircularProgress({ percentage, size = 'md' }) {
  const getGradientColors = () => {
    if (percentage >= 90) return { from: '#10b981', to: '#059669' }; // green gradient
    if (percentage >= 50) return { from: '#f59e0b', to: '#d97706' }; // yellow gradient
    return { from: '#ef4444', to: '#dc2626' }; // red gradient
  };

  const gradient = getGradientColors();

  return (
    <div className="progress-bar">
      <div className="progress-bar-track" data-size={size}>
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
          }}
        />
      </div>

      <div className="progress-footer">
        <span className="progress-label" data-size={size}>
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
}

CircularProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default CircularProgress;
