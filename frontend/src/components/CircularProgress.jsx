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

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const gradient = getGradientColors();

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[size]} overflow-hidden mb-2`}>
        <div 
          className={`${heightClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
          }}
        />
      </div>
      
      {/* Percentage label */}
      <div className="flex justify-between items-center">
        <span className={`${textSizeClasses[size]} font-semibold text-gray-900`}>
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
