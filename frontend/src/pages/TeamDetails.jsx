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
import './TeamDetails.css';

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
      <div className="team-detail-error">
        <div className="team-detail-error__body">
          <i className="fa-solid fa-circle-exclamation team-detail-error__icon" aria-hidden="true"></i>
          <div>
            <h3 className="team-detail-error__title">Error</h3>
            <p className="team-detail-error__message">{error}</p>
            <div className="team-detail-error__actions">
              <button
                onClick={loadTeam}
                className="btn-error-retry"
              >
                Retry
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-error-back"
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
      <div className="team-detail-header">
        <div className="team-detail-nav">
          <Link to="/" className="btn-back" data-testid="back-link">
            <i className="fa-solid fa-chevron-left btn-back__icon" aria-hidden="true"></i>
            Back to Teams
          </Link>
          <StatusBadge status={team.readiness} />
        </div>

        <div>
          <h1 className="team-detail-title">{team.name}</h1>
          {team.description && (
            <p className="team-detail-description">{team.description}</p>
          )}
        </div>
      </div>

      {/* Tech Stack and Progress Grid */}
      <div className="team-detail-grid">
        {/* Tech Stack Card */}
        <div className="team-detail-card">
          <h2 className="team-detail-card__title">Technology Stack</h2>
          <TechStackDisplay
            frontend={team.stack?.frontend}
            backend={team.stack?.backend}
            database={team.stack?.database}
          />
        </div>

        {/* Overall Progress */}
        <div className="team-detail-card">
          <h2 className="team-detail-card__title">Overall Progress</h2>
          <div className="team-detail-card__progress">
            <CircularProgress percentage={calculateOverallCompletion()} size="lg" />
          </div>
        </div>
      </div>

      {/* Save/Cancel Bar */}
      {hasChanges && (
        <div className="team-changes-bar" data-testid="unsaved-changes-bar">
          <div className="team-changes-bar__left">
            <i className="fa-solid fa-circle-info team-changes-bar__icon" aria-hidden="true"></i>
            <span className="team-changes-bar__text">You have unsaved changes</span>
          </div>
          <div className="team-changes-bar__actions">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="btn-cancel"
              data-testid="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-save"
              data-testid="save-btn"
            >
              {saving ? (
                <>
                  <i className="fa-solid fa-spinner btn-save__spinner" aria-hidden="true"></i>
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
      <div className="team-checklist">
        <h2 className="team-checklist__title">Readiness Checklist</h2>

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
