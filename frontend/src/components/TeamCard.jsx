import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatusBadge from './StatusBadge';
import CircularProgress from './CircularProgress';
import './TeamCard.css';

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
      className="team-card"
      data-testid={`team-card-${team.id}`}
    >
      <div className="team-card__header">
        <h3 className="team-card__name">{team.name}</h3>
        <StatusBadge status={team.readiness} />
      </div>

      {team.description && (
        <p className="team-card__description">{team.description}</p>
      )}

      <div className="team-card__stack">
        <div className="team-card__stack-row">
          <span className="team-card__stack-label">Frontend</span>
          <p className="team-card__stack-value">{team.stack?.frontend || 'N/A'}</p>
        </div>
        <div className="team-card__stack-row">
          <span className="team-card__stack-label">Backend</span>
          <p className="team-card__stack-value">{team.stack?.backend || 'N/A'}</p>
        </div>
        {team.stack?.database && (
          <div className="team-card__stack-row">
            <span className="team-card__stack-label">Database</span>
            <p className="team-card__stack-value">{team.stack.database}</p>
          </div>
        )}
      </div>

      <div className="team-card__footer">
        <div className="team-card__progress">
          <CircularProgress percentage={completionPercentage} size="sm" />
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
