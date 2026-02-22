import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Interactive checklist component for managing team readiness items
 */
function ChecklistSection({ title, items, onItemToggle, categoryKey }) {
  const [expanded, setExpanded] = useState(true);
  
  // Get icon for category
  const getCategoryIcon = () => {
    const icons = {
      codebase: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      versioning: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      documentation: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      testing: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      copilot: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
        </svg>
      ),
      modernization: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    };
    return icons[categoryKey] || null;
  };
  
  if (!items || items.length === 0) {
    return null;
  }

  const completedCount = items.filter(item => item.isComplete).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  return (
    <div className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-md" data-testid={`checklist-${categoryKey}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-8 py-5 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
        data-testid={`toggle-${categoryKey}`}
      >
        <div className="flex items-center space-x-4 pt-4 pl-4">
          <div className="text-gray-600">
            {getCategoryIcon()}
          </div>
          <h3 className="text-l font-bold text-gray-900">{title}</h3>
          <span className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-300">
            {completedCount}/{items.length}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-40 bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                  percentage >= 90 ? 'bg-green-500' :
                  percentage >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-base font-bold text-gray-900 min-w-[3.5rem] text-right">
              {percentage}%
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="px-8 py-6 bg-white space-y-4">
          {items.map((item, index) => (
            <div
              key={`${categoryKey}-${index}`}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
            >
              <input
                type="checkbox"
                checked={item.isComplete}
                onChange={() => onItemToggle(categoryKey, index)}
                className="mt-1 h-6 w-6 text-gold-dark rounded border-gray-300 focus:ring-2 focus:ring-gold focus:ring-offset-2 cursor-pointer"
                data-testid={`checkbox-${categoryKey}-${index}`}
              />
              <div className="flex-1 min-w-0">
                <label className={`block text-base font-semibold cursor-pointer ${
                  item.isComplete ? 'text-gray-400 line-through' : 'text-gray-900'
                }`}>
                  {item.description}
                </label>
                {item.guidance && (
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.guidance}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ChecklistSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
    guidance: PropTypes.string,
  })).isRequired,
  onItemToggle: PropTypes.func.isRequired,
  categoryKey: PropTypes.string.isRequired,
};

export default ChecklistSection;
