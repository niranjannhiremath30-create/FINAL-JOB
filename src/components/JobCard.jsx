import React from 'react';
import { getJobStatus, setJobStatus, addStatusUpdate } from '../utils/jobStatus';

function formatPosted(days) {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function getMatchBadgeClass(score) {
  if (score >= 80) return "match-badge--high";
  if (score >= 60) return "match-badge--medium";
  if (score >= 40) return "match-badge--neutral";
  return "match-badge--low";
}

const STATUSES = ["Not Applied", "Applied", "Rejected", "Selected"];

function getStatusBadgeClass(status) {
  if (status === "Applied") return "status-badge--applied";
  if (status === "Rejected") return "status-badge--rejected";
  if (status === "Selected") return "status-badge--selected";
  return "status-badge--neutral";
}

export default function JobCard({ job, isSaved, matchScore, status, onStatusChange, onView, onSave, onUnsave, onApply }) {
  const currentStatus = status ?? getJobStatus(job.id);

  const handleSave = () => {
    if (isSaved) onUnsave?.(job.id);
    else onSave?.(job.id);
  };

  const handleStatusChange = (newStatus) => {
    setJobStatus(job.id, newStatus);
    if (newStatus !== "Not Applied") {
      addStatusUpdate(job.id, newStatus, job.title, job.company);
    }
    onStatusChange?.(newStatus);
  };

  return (
    <div className="job-card">
      <div className="job-card__header">
        <h4 className="job-card__title">{job.title}</h4>
        <div className="job-card__badges">
          {matchScore != null && (
            <span className={`match-badge ${getMatchBadgeClass(matchScore)}`}>
              {matchScore}% match
            </span>
          )}
          <span className="badge badge-status">{job.source}</span>
        </div>
      </div>
      <p className="job-card__company">{job.company}</p>
      <p className="job-card__meta">
        {job.location} · {job.mode} · {job.experience}
      </p>
      <p className="job-card__salary">{job.salaryRange}</p>
      <p className="job-card__posted">{formatPosted(job.postedDaysAgo)}</p>
      <div className="job-card__status">
        <span className="job-card__status-label">Status:</span>
        <div className="job-card__status-buttons">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              className={`status-btn ${currentStatus === s ? getStatusBadgeClass(s) : ''}`}
              onClick={() => handleStatusChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="job-card__actions">
        <button type="button" className="btn btn-secondary" onClick={() => onView?.(job)}>View</button>
        <button
          type="button"
          className={`btn btn-secondary ${isSaved ? 'job-card__saved' : ''}`}
          onClick={handleSave}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => onApply?.(job.applyUrl)}>Apply</button>
      </div>
    </div>
  );
}
