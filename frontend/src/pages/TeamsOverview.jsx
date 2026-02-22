import { useState, useEffect } from 'react';
import { teamService } from '../services/api';
import TeamCard from '../components/TeamCard';
import { SkeletonGrid } from '../components/SkeletonLoader';
import ScrollToTop from '../components/ScrollToTop';
import './TeamsOverview.css';

function TeamsOverview() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teamService.getAll();
      setTeams(response.data);
    } catch (err) {
      console.error('Failed to load teams:', err);
      setError(err.response?.data?.message || 'Failed to load teams. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="teams-header">
          <h1 className="teams-title">
            <i className="fa-solid fa-layer-group teams-title__icon" aria-hidden="true"></i>
            Development Teams
          </h1>
          <p className="teams-subtitle">
            Overview of all development teams and their readiness status
          </p>
        </div>
        <SkeletonGrid count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="teams-error" data-testid="error-container">
        <div className="teams-error__body">
          <i className="fa-solid fa-circle-exclamation teams-error__icon" aria-hidden="true"></i>
          <div>
            <h3 className="teams-error__title">Error loading teams</h3>
            <p className="teams-error__message">{error}</p>
            <button
              onClick={loadTeams}
              className="btn-retry"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScrollToTop />
      <div className="teams-header">
        <h1 className="teams-title">
          <i className="fa-solid fa-layer-group teams-title__icon" aria-hidden="true"></i>
          Development Teams
        </h1>
        <p className="teams-subtitle">
          Overview of all development teams and their readiness status
        </p>
      </div>

      {teams.length === 0 ? (
        <div className="teams-empty" data-testid="empty-state">
          <div className="teams-empty__icon-wrap">
            <i className="fa-solid fa-users teams-empty__icon" aria-hidden="true"></i>
          </div>
          <h3 className="teams-empty__title">No teams yet</h3>
          <p className="teams-empty__subtitle">Get started by adding your first development team</p>
          <button className="btn-add-team">
            Add Team
          </button>
        </div>
      ) : (
        <>
          <div className="teams-container" data-testid="teams-container">
            <div className="teams-grid" data-testid="teams-grid">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>

            <div className="teams-count-wrap">
              <p className="teams-count">
                <i className="fa-solid fa-check teams-count__icon" aria-hidden="true"></i>
                Showing {teams.length} {teams.length === 1 ? 'team' : 'teams'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TeamsOverview;
