import { useState, useEffect } from 'react';
import { teamService } from '../services/api';
import TeamCard from '../components/TeamCard';
import { SkeletonGrid } from '../components/SkeletonLoader';
import ScrollToTop from '../components/ScrollToTop';

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
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Development Teams</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Overview of all development teams and their readiness status
          </p>
        </div>
        <SkeletonGrid count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8" data-testid="error-container">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-lg text-red-800 font-bold mb-2">Error loading teams</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadTeams}
              className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
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
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Development Teams</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Overview of all development teams and their readiness status
        </p>
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-dashed border-gray-300 shadow-sm" data-testid="empty-state">
          <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
            <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No teams yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first development team</p>
          <button className="px-6 py-2.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-dark transition-colors shadow-md">
            Add Team
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 lg:p-6" data-testid="teams-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" data-testid="teams-grid">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="inline-block bg-gray-50 px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700">
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
