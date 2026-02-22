import { useState } from 'react';
import PropTypes from 'prop-types';
import './ChecklistSection.css';

/**
 * Interactive checklist component for managing team readiness items
 */
function ChecklistSection({ title, items, onItemToggle, categoryKey }) {
  const [expanded, setExpanded] = useState(true);

  // Get icon for category
  const getCategoryIcon = () => {
    const icons = {
      codebase:      'fa-solid fa-code',
      versioning:    'fa-solid fa-code-branch',
      documentation: 'fa-solid fa-file-lines',
      testing:       'fa-solid fa-circle-check',
      copilot:       'fa-solid fa-robot',
      modernization: 'fa-solid fa-bolt',
    };
    const cls = icons[categoryKey];
    return cls ? <i className={`${cls} checklist-icon`} aria-hidden="true"></i> : null;
  };

  if (!items || items.length === 0) {
    return null;
  }

  const completedCount = items.filter(item => item.isComplete).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  return (
    <div className="checklist-section" data-testid={`checklist-${categoryKey}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="checklist-header"
        data-testid={`toggle-${categoryKey}`}
      >
        <div className="checklist-header__left">
          {getCategoryIcon()}
          <h3 className="checklist-title">{title}</h3>
          <span className="checklist-count">
            {completedCount}/{items.length}
          </span>
        </div>
        <div className="checklist-header__right">
          <div className="checklist-progress">
            <div className="checklist-progress-track">
              <div
                className="checklist-progress-fill"
                data-level={percentage >= 90 ? 'high' : percentage >= 50 ? 'mid' : 'low'}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="checklist-percent">
              {percentage}%
            </span>
          </div>
          <i className="fa-solid fa-chevron-down checklist-chevron" data-expanded={expanded} aria-hidden="true"></i>
        </div>
      </button>

      {expanded && (
        <div className="checklist-body">
          {items.map((item, index) => (
            <div
              key={`${categoryKey}-${index}`}
              className="checklist-item"
            >
              <input
                type="checkbox"
                checked={item.isComplete}
                onChange={() => onItemToggle(categoryKey, index)}
                className="checklist-checkbox"
                data-testid={`checkbox-${categoryKey}-${index}`}
              />
              <div className="checklist-item__content">
                <label
                  className="checklist-item__label"
                  data-complete={item.isComplete}
                >
                  {item.description}
                </label>
                {item.guidance && (
                  <p className="checklist-item__guidance">{item.guidance}</p>
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
