import React, { useState } from 'react';
import { jobs } from '../data/jobs';
import { getSavedJobIds, unsaveJob } from '../utils/savedJobs';
import { getAllStatuses } from '../utils/jobStatus';
import { getTestStatuses, allTestsPassed } from '../utils/testChecklist';
import { TopBar, ContextHeader, MainContent, PrimaryWorkspace, SecondaryPanel, SecondaryPanelSection, ProofFooter, Button, EmptyState } from '../design-system';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';

export default function Saved() {
  const [savedIds, setSavedIds] = useState(getSavedJobIds);
  const [statuses, setStatuses] = useState(getAllStatuses);
  const [modalJob, setModalJob] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  const handleUnsave = (id) => {
    setSavedIds(unsaveJob(id));
  };
  const handleStatusChange = (newStatus) => {
    setStatuses(getAllStatuses());
    if (newStatus !== "Not Applied") {
      setToast({ visible: true, message: `Status updated: ${newStatus}` });
    }
  };

  const testsPassed = allTestsPassed(getTestStatuses());

  return (
    <div className="app-shell">
      <TopBar
        progress="Step 2 / 4"
        status="In Progress"
        statusVariant="warning"
        showNav
      />
      <ContextHeader
        headline="Saved Jobs"
        subtext="Jobs you've saved for later. Remove them when done."
      />
      <MainContent>
        <PrimaryWorkspace>
          {savedJobs.length === 0 ? (
            <EmptyState
              title="No saved jobs yet"
              message="Save jobs from the Dashboard to review them here. Use the Save button on any job card."
              action={
                <Link to="/dashboard">
                  <Button variant="primary">Browse jobs</Button>
                </Link>
              }
            />
          ) : (
            <div className="jobs-grid">
              {savedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  status={statuses[job.id]}
                  isSaved={true}
                  onStatusChange={handleStatusChange}
                  onView={setModalJob}
                  onUnsave={handleUnsave}
                  onApply={(url) => window.open(url, '_blank')}
                />
              ))}
            </div>
          )}
        </PrimaryWorkspace>
        <SecondaryPanel>
          <SecondaryPanelSection label="Saved count">
            <p className="secondary-panel__text">
              {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved.
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
