import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { getSavedJobIds, saveJob, unsaveJob } from '../utils/savedJobs';
import { getAllStatuses } from '../utils/jobStatus';
import { getPreferences, hasPreferences } from '../utils/preferences';
import { computeMatchScore } from '../utils/matchScore';
import { extractSalaryValue } from '../utils/salary';
import { getTestStatuses, allTestsPassed } from '../utils/testChecklist';
import { TopBar, ContextHeader, MainContent, PrimaryWorkspace, SecondaryPanel, SecondaryPanelSection, ProofFooter } from '../design-system';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Toast from '../components/Toast';

function filterAndSortJobs(jobsWithScores, filters, showOnlyMatches, minMatchScore, statusMap) {
  let result = [...jobsWithScores];

  if (filters.keyword.trim()) {
    const k = filters.keyword.toLowerCase();
    result = result.filter(
      (item) =>
        item.job.title.toLowerCase().includes(k) ||
        item.job.company.toLowerCase().includes(k)
    );
  }
  if (filters.location !== "All") {
    result = result.filter((item) => item.job.location === filters.location);
  }
  if (filters.mode !== "All") {
    result = result.filter((item) => item.job.mode === filters.mode);
  }
  if (filters.experience !== "All") {
    result = result.filter((item) => item.job.experience === filters.experience);
  }
  if (filters.source !== "All") {
    result = result.filter((item) => item.job.source === filters.source);
  }

  if (filters.status && filters.status !== "All") {
    result = result.filter((item) => {
      const s = statusMap[item.job.id];
      return (s || "Not Applied") === filters.status;
    });
  }

  if (showOnlyMatches) {
    result = result.filter((item) => item.matchScore >= minMatchScore);
  }

  if (filters.sort === "oldest") {
    result.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
  } else if (filters.sort === "matchScore") {
    result.sort((a, b) => b.matchScore - a.matchScore);
  } else if (filters.sort === "salary") {
    result.sort(
      (a, b) =>
        extractSalaryValue(b.job.salaryRange) -
        extractSalaryValue(a.job.salaryRange)
    );
  } else {
    result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
  }

  return result;
}

export default function Dashboard() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "All",
    mode: "All",
    experience: "All",
    source: "All",
    status: "All",
    sort: "latest",
  });
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const [savedIds, setSavedIds] = useState(getSavedJobIds);
  const [statuses, setStatuses] = useState(getAllStatuses);
  const [modalJob, setModalJob] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const preferences = getPreferences();
  const prefsExist = hasPreferences();

  const jobsWithScores = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: computeMatchScore(job, preferences),
    }));
  }, []);

  const filteredJobs = useMemo(
    () =>
      filterAndSortJobs(
        jobsWithScores,
        filters,
        showOnlyMatches,
        preferences?.minMatchScore ?? 40,
        statuses
      ),
    [jobsWithScores, filters, showOnlyMatches, preferences?.minMatchScore, statuses]
  );

  const handleSave = (id) => {
    setSavedIds(saveJob(id));
  };
  const handleUnsave = (id) => {
    setSavedIds(unsaveJob(id));
  };
  const handleStatusChange = (newStatus) => {
    setStatuses(getAllStatuses());
    if (newStatus !== "Not Applied") {
      setToast({ visible: true, message: `Status updated: ${newStatus}` });
    }
  };

  const emptyMessage = prefsExist && showOnlyMatches
    ? "No roles match your criteria. Adjust filters or lower threshold."
    : "No jobs match your search.";

  const testsPassed = allTestsPassed(getTestStatuses());

  return (
    <div className="app-shell">
      <TopBar
        progress="Step 3 / 4"
        status="In Progress"
        statusVariant="warning"
        showNav
      />
      <ContextHeader
        headline="Job Listings"
        subtext="Browse and save jobs that match your profile. Use filters to narrow results."
      />
      <MainContent>
        <PrimaryWorkspace>
          {!prefsExist && (
            <div className="prefs-banner">
              Set your preferences to activate intelligent matching.{' '}
              <Link to="/settings">Go to Settings</Link>
            </div>
          )}
          <FilterBar filters={filters} onFilterChange={setFilters} />
          {prefsExist && (
            <div className="dashboard-toggles">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={showOnlyMatches}
                  onChange={(e) => setShowOnlyMatches(e.target.checked)}
                />
                Show only jobs above my threshold
              </label>
            </div>
          )}
          <div className="jobs-grid">
            {filteredJobs.length === 0 ? (
              <div className="jobs-empty">
                <p className="jobs-empty__message">{emptyMessage}</p>
              </div>
            ) : (
              filteredJobs.map(({ job, matchScore }) => (
                <JobCard
                  key={job.id}
                  job={job}
                  matchScore={prefsExist ? matchScore : null}
                  status={statuses[job.id]}
                  isSaved={savedIds.includes(job.id)}
                  onStatusChange={handleStatusChange}
                  onView={setModalJob}
                  onSave={handleSave}
                  onUnsave={handleUnsave}
                  onApply={(url) => window.open(url, '_blank')}
                />
              ))
            )}
          </div>
        </PrimaryWorkspace>
        <SecondaryPanel>
          <SecondaryPanelSection label="Quick tips">
            <p className="secondary-panel__text">
              Use View to see full description and skills. Save jobs to review later on the Saved page. Apply opens the job in a new tab.
            </p>
          </SecondaryPanelSection>
          <SecondaryPanelSection label="Saved jobs">
            <p className="secondary-panel__text">
              You have {savedIds.length} saved job{savedIds.length !== 1 ? 's' : ''}. Visit Saved to manage them.
            </p>
          </SecondaryPanelSection>
        </SecondaryPanel>
      </MainContent>
      <ProofFooter
        items={[
          { id: 'ui', label: 'UI Built', complete: true },
          { id: 'logic', label: 'Logic Working', complete: true },
          { id: 'test', label: 'Test Passed', complete: testsPassed },
          { id: 'deploy', label: 'Deployed', complete: false },
        ]}
      />
      {modalJob && (
        <JobModal job={modalJob} onClose={() => setModalJob(null)} />
      )}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast((p) => ({ ...p, visible: false }))}
      />
    </div>
  );
}
