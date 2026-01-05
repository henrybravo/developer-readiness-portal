import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatusBadge from './StatusBadge';
import CircularProgress from './CircularProgress';

/**
 * Team card component for displaying team summary in grid layout
 */
function TeamCard({ team }) {
  // Calculate completion percentage
  const calculateCompletion = () => {
    const allItems = [
      ...(team.checklist?.codebase || []),
      ...(team.checklist?.versioning || []),
      ...(team.checklist?.documentation || []),
      ...(team.checklist?.testing || []),
      ...(team.checklist?.copilot || []),
      ...(team.checklist?.modernization || [])
    ];
    
    if (allItems.length === 0) return 0;
    
    const completed = allItems.filter(item => item.isComplete).length;
    return Math.round((completed / allItems.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <Link 
      to={`/teams/${team.id}`}
      className="block bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:border-gold transition-all duration-200 p-6 lg:p-8 transform hover:scale-[1.02] h-full"
      data-testid={`team-card-${team.id}`}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{team.name}</h3>
        <StatusBadge status={team.readiness} />
      </div>
      
      {team.description && (
        <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">{team.description}</p>
      )}
      
      <div className="space-y-3 mb-6">
        <div className="text-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Frontend</span>
          <p className="font-semibold text-gray-900 mt-1">{team.stack?.frontend || 'N/A'}</p>
        </div>
        <div className="text-sm">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Backend</span>
          <p className="font-semibold text-gray-900 mt-1">{team.stack?.backend || 'N/A'}</p>
        </div>
        {team.stack?.database && (
          <div className="text-sm">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Database</span>
            <p className="font-semibold text-gray-900 mt-1">{team.stack.database}</p>
          </div>
        )}
      </div>
      
      <div className="pt-6 border-t">
        <div className="mb-4">
          <div className="flex justify-center">
            <CircularProgress percentage={completionPercentage} size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}

TeamCard.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    readiness: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    stack: PropTypes.shape({
      frontend: PropTypes.string,
      backend: PropTypes.string,
      database: PropTypes.string,
    }),
    checklist: PropTypes.object,
  }).isRequired,
};

export default TeamCard;
