import PropTypes from 'prop-types';

/**
 * Icon components for technology stack
 */
export const ReactIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="11" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="12" cy="11" rx="9" ry="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="12" cy="11" rx="9" ry="4" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 12 11)" />
    <ellipse cx="12" cy="11" rx="9" ry="4" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120 12 11)" />
  </svg>
);

export const DotNetIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="4" height="4" rx="1" />
    <rect x="10" y="3" width="4" height="4" rx="1" />
    <rect x="17" y="3" width="4" height="4" rx="1" />
    <rect x="3" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
    <rect x="17" y="10" width="4" height="4" rx="1" />
    <rect x="3" y="17" width="4" height="4" rx="1" />
    <rect x="10" y="17" width="4" height="4" rx="1" />
    <rect x="17" y="17" width="4" height="4" rx="1" />
  </svg>
);

export const DatabaseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

export const NodeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" opacity="0.3" />
    <path d="M12 4.5L4 8.5v8c0 4 2.5 7.5 8 8.5 5.5-1 8-4.5 8-8.5v-8l-8-4z" />
  </svg>
);

export const JavaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.5 7c-.5 0-1 .25-1 .75S8 9 8.5 9c.5 0 1-.25 1-.75S9 7 8.5 7z" />
    <path d="M15.5 7c-.5 0-1 .25-1 .75S15 9 15.5 9c.5 0 1-.25 1-.75S16 7 15.5 7z" />
    <path d="M12 16c-2 0-4-1-4-3h2c0 1.25 1 2 2 2s2-.75 2-2h2c0 2-2 3-4 3z" />
  </svg>
);

/**
 * Technology Stack component that displays tech with icons
 */
function TechStackDisplay({ frontend, backend, database }) {
  const getTechIcon = (tech) => {
    if (!tech) return null;

    const lowerTech = tech.toLowerCase();

    if (lowerTech.includes('react')) return <ReactIcon />;
    if (lowerTech.includes('.net') || lowerTech.includes('dotnet') || lowerTech.includes('aspnet')) return <DotNetIcon />;
    if (lowerTech.includes('node') || lowerTech.includes('nodejs')) return <NodeIcon />;
    if (lowerTech.includes('java')) return <JavaIcon />;
    if (lowerTech.includes('sql') || lowerTech.includes('postgres') || lowerTech.includes('mysql')) return <DatabaseIcon />;

    return null;
  };

  return (
    <div className="space-y-4">
      {frontend && (
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">Frontend</span>
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-gray-600">{getTechIcon(frontend)}</span>
            <p className="text-base font-bold text-gray-900">{frontend}</p>
          </div>
        </div>
      )}
      {backend && (
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">Backend</span>
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-gray-600">{getTechIcon(backend)}</span>
            <p className="text-base font-bold text-gray-900">{backend}</p>
          </div>
        </div>
      )}
      {database && (
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">Database</span>
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-gray-600">{getTechIcon(database)}</span>
            <p className="text-base font-bold text-gray-900">{database}</p>
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
