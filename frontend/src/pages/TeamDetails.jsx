import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { teamService } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import ChecklistSection from '../components/ChecklistSection';
import CircularProgress from '../components/CircularProgress';
import TechStackDisplay from '../components/TechStackDisplay';
import Toast from '../components/Toast';
import { SkeletonDetailHeader, SkeletonCardContent, SkeletonChecklistSection } from '../components/SkeletonLoader';
import ScrollToTop from '../components/ScrollToTop';

function TeamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teamService.getById(id);
      setTeam(response.data);
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to load team:', err);
      if (err.response?.status === 404) {
        setError('Team not found');
      } else {
        setError(err.response?.data?.message || 'Failed to load team details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleItemToggle = (categoryKey, itemIndex) => {
    setTeam(prevTeam => {
      const newTeam = { ...prevTeam };
      const category = [...newTeam.checklist[categoryKey]];
      category[itemIndex] = {
        ...category[itemIndex],
        isComplete: !category[itemIndex].isComplete
      };
      newTeam.checklist = {
        ...newTeam.checklist,
        [categoryKey]: category
      };
      return newTeam;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await teamService.updateChecklist(id, { checklist: team.checklist });
      setTeam(response.data);
      setHasChanges(false);
      setToast({ message: 'Changes saved successfully!', type: 'success' });
    } catch (err) {
      console.error('Failed to save checklist:', err);
      setToast({ message: err.response?.data?.message || 'Failed to save changes. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    loadTeam();
  };

  if (loading) {
    return (
      <div>
        <SkeletonDetailHeader />
        <SkeletonCardContent />
        <SkeletonCardContent />
        <SkeletonChecklistSection />
        <SkeletonChecklistSection />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 shadow-md">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-red-800 font-semibold mb-1">Error</h3>
            <p className="text-red-700 mb-3">{error}</p>
            <div className="space-x-2">
              <button
                onClick={loadTeam}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back to Teams
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!team) return null;

  const calculateOverallCompletion = () => {
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

  return (
    <div>
      <ScrollToTop />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gold-dark hover:text-gold-dark font-semibold rounded-lg transition-colors shadow-sm" data-testid="back-link">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Teams
          </Link>
          <StatusBadge status={team.readiness} />
        </div>
        
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">{team.name}</h1>
          {team.description && (
            <p className="text-lg text-gray-600 leading-relaxed">{team.description}</p>
          )}
        </div>
      </div>

      {/* Tech Stack and Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Tech Stack Card */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Technology Stack</h2>
          <TechStackDisplay 
            frontend={team.stack?.frontend} 
            backend={team.stack?.backend} 
            database={team.stack?.database}
          />
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Overall Progress</h2>
          <div className="flex justify-center">
            <CircularProgress percentage={calculateOverallCompletion()} size="lg" />
          </div>
        </div>
      </div>

      {/* Save/Cancel Bar */}
      {hasChanges && (
        <div className="sticky top-0 z-10 bg-gold-light border-2 border-gold rounded-2xl p-6 mb-8 flex items-center justify-between shadow-lg" data-testid="unsaved-changes-bar">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-gold-dark mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-900 font-bold text-base">You have unsaved changes</span>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-2.5 bg-white text-gray-700 font-medium border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              data-testid="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-gold-dark text-white font-bold rounded-md hover:bg-gold transition-colors disabled:opacity-50 flex items-center shadow-md"
              data-testid="save-btn"
            >
              {saving ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Checklist Sections */}
       <div className="space-y-12">
        <h2 className="text-xl lg:text-3xl font-bold text-gray-700 mt-8 mb-4 tracking-tight">Readiness Checklist</h2>
               
        <ChecklistSection
          title="Codebase Health"
          items={team.checklist?.codebase || []}
          onItemToggle={handleItemToggle}
          categoryKey="codebase"
        />
        
        <ChecklistSection
          title="Version Control & Dependencies"
          items={team.checklist?.versioning || []}
          onItemToggle={handleItemToggle}
          categoryKey="versioning"
        />
        
        <ChecklistSection
          title="Documentation"
          items={team.checklist?.documentation || []}
          onItemToggle={handleItemToggle}
          categoryKey="documentation"
        />
        
        <ChecklistSection
          title="Testing & Quality"
          items={team.checklist?.testing || []}
          onItemToggle={handleItemToggle}
          categoryKey="testing"
        />
        
        <ChecklistSection
          title="GitHub Copilot Enablement"
          items={team.checklist?.copilot || []}
          onItemToggle={handleItemToggle}
          categoryKey="copilot"
        />
        
        <ChecklistSection
          title="Modernization Readiness"
          items={team.checklist?.modernization || []}
          onItemToggle={handleItemToggle}
          categoryKey="modernization"
        />
      </div>
    </div>
  );
}

export default TeamDetails;
