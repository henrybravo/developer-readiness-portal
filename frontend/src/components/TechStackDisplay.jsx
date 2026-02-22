import PropTypes from 'prop-types';
import './TechStackDisplay.css';

/**
 * Technology Stack component that displays tech with icons
 */
function TechStackDisplay({ frontend, backend, database }) {
  const getTechIcon = (tech) => {
    if (!tech) return null;
    const t = tech.toLowerCase();
    if (t.includes('react')) return <i className="fa-brands fa-react tech-stack__icon" aria-hidden="true"></i>;
    if (t.includes('.net') || t.includes('dotnet') || t.includes('aspnet')) return <i className="fa-brands fa-microsoft tech-stack__icon" aria-hidden="true"></i>;
    if (t.includes('node')) return <i className="fa-brands fa-node-js tech-stack__icon" aria-hidden="true"></i>;
    if (t.includes('java')) return <i className="fa-brands fa-java tech-stack__icon" aria-hidden="true"></i>;
    if (t.includes('sql') || t.includes('postgres') || t.includes('mysql')) return <i className="fa-solid fa-database tech-stack__icon" aria-hidden="true"></i>;
    return null;
  };

  return (
    <div className="tech-stack">
      {frontend && (
        <div className="tech-stack__row">
          <span className="tech-stack__label">Frontend</span>
          <div className="tech-stack__value">
            {getTechIcon(frontend)}
            <p className="tech-stack__name">{frontend}</p>
          </div>
        </div>
      )}
      {backend && (
        <div className="tech-stack__row">
          <span className="tech-stack__label">Backend</span>
          <div className="tech-stack__value">
            {getTechIcon(backend)}
            <p className="tech-stack__name">{backend}</p>
          </div>
        </div>
      )}
      {database && (
        <div className="tech-stack__row">
          <span className="tech-stack__label">Database</span>
          <div className="tech-stack__value">
            {getTechIcon(database)}
            <p className="tech-stack__name">{database}</p>
          </div>
        </div>
      )}
    </div>
  );
}

TechStackDisplay.propTypes = {
  frontend: PropTypes.string,
  backend: PropTypes.string,
  database: PropTypes.string
};

export default TechStackDisplay;
