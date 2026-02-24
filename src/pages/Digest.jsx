import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { getPreferences, hasPreferences } from '../utils/preferences';
import { computeMatchScore } from '../utils/matchScore';
import { getDigestForToday, saveDigestForToday } from '../utils/digest';
import { getStatusUpdates } from '../utils/jobStatus';
import { getTestStatuses, allTestsPassed } from '../utils/testChecklist';
import { TopBar, ContextHeader, MainContent, PrimaryWorkspace, SecondaryPanel, SecondaryPanelSection, ProofFooter, Button } from '../design-system';

function formatDate() {
  const d = new Date();
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function generateDigest(preferences) {
  const minScore = preferences?.minMatchScore ?? 0;
  const withScores = jobs
    .map((job) => ({
      job,
      matchScore: computeMatchScore(job, preferences),
    }))
    .filter((item) => item.matchScore >= minScore)
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return a.job.postedDaysAgo - b.job.postedDaysAgo;
    })
    .slice(0, 10);
  return withScores;
}

function digestToPlainText(digestItems) {
  const lines = [
    "Top 10 Jobs For You — 9AM Digest",
    formatDate(),
    "",
    ...digestItems.map(({ job, matchScore }, i) => {
      return [
        `${i + 1}. ${job.title}`,
        `   Company: ${job.company}`,
        `   Location: ${job.location} · Experience: ${job.experience}`,
        `   Match: ${matchScore}%`,
        `   Apply: ${job.applyUrl}`,
        "",
      ].join("\n");
    }),
    "This digest was generated based on your preferences.",
  ];
  return lines.join("\n");
}

function digestToMailtoBody(digestItems) {
  return encodeURIComponent(digestToPlainText(digestItems));
}

export default function Digest() {
  const [digest, setDigest] = useState(() => getDigestForToday());
  const preferences = getPreferences();
  const prefsExist = hasPreferences();

  const handleGenerate = useCallback(() => {
    if (!prefsExist) return;
    const existing = getDigestForToday();
    if (existing && existing.date === new Date().toISOString().slice(0, 10)) {
      setDigest(existing);
      return;
    }
    const items = generateDigest(preferences);
    const dateStr = new Date().toISOString().slice(0, 10);
    const data = { date: dateStr, items };
    saveDigestForToday(data);
    setDigest(data);
  }, [prefsExist, preferences]);

  const handleCopy = useCallback(() => {
    if (!digest || !digest.items) return;
    const text = digestToPlainText(digest.items);
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
  }, [digest]);

  const handleEmail = useCallback(() => {
    if (!digest || !digest.items) return;
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = digestToMailtoBody(digest.items);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [digest]);

  const digestItems = digest?.items || [];
  const hasMatches = digestItems.length > 0;
  const statusUpdates = getStatusUpdates();
  const testsPassed = allTestsPassed(getTestStatuses());

  return (
    <div className="app-shell">
      <TopBar
        progress="Step 4 / 4"
        status="In Progress"
        statusVariant="warning"
        showNav
      />
      <ContextHeader
        headline="Daily Digest"
        subtext="Top 10 jobs matched to your preferences. Generate once per day."
      />
      <MainContent>
        <PrimaryWorkspace>
          {!prefsExist && (
            <div className="digest-block">
              <p className="digest-block__message">
                Set preferences to generate a personalized digest.
              </p>
              <Link to="/settings">
                <Button variant="primary">Go to Settings</Button>
              </Link>
            </div>
          )}
          {prefsExist && (
            <>
              <div className="digest-actions">
                <Button variant="primary" onClick={handleGenerate}>
                  Generate Today's 9AM Digest (Simulated)
                </Button>
              </div>
              <p className="digest-note">
                Demo Mode: Daily 9AM trigger simulated manually.
              </p>
              {digestItems.length === 0 && digest !== null && (
                <div className="digest-empty">
                  <p className="digest-empty__message">
                    No matching roles today. Check again tomorrow.
                  </p>
                </div>
              )}
              {digestItems.length === 0 && digest === null && (
                <p className="digest-hint">Click the button above to generate today's digest.</p>
              )}
              {hasMatches && (
                <div className="digest-card">
                  <div className="digest-card__header">
                    <h2 className="digest-card__title">
                      Top 10 Jobs For You — 9AM Digest
                    </h2>
                    <p className="digest-card__date">{formatDate()}</p>
                  </div>
                  <div className="digest-card__jobs">
                    {digestItems.map(({ job, matchScore }) => (
                      <div key={job.id} className="digest-job">
                        <div className="digest-job__main">
                          <h3 className="digest-job__title">{job.title}</h3>
                          <p className="digest-job__company">{job.company}</p>
                          <p className="digest-job__meta">
                            {job.location} · {job.experience}
                          </p>
                          <span className="digest-job__score">{matchScore}% match</span>
                        </div>
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary digest-job__apply"
                        >
                          Apply
                        </a>
                      </div>
                    ))}
                  </div>
                  <p className="digest-card__footer">
                    This digest was generated based on your preferences.
                  </p>
                  <div className="digest-card__buttons">
                    <Button variant="secondary" onClick={handleCopy}>
                      Copy Digest to Clipboard
                    </Button>
                    <Button variant="secondary" onClick={handleEmail}>
                      Create Email Draft
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </PrimaryWorkspace>
        <SecondaryPanel>
          <SecondaryPanelSection label="How it works">
            <p className="secondary-panel__text">
              Jobs are ranked by match score (descending), then by recency. The digest is stored per day. Refresh and return — it persists.
            </p>
          </SecondaryPanelSection>
          <SecondaryPanelSection label="Recent Status Updates">
            {statusUpdates.length === 0 ? (
              <p className="secondary-panel__text">No status updates yet.</p>
            ) : (
              <ul className="status-updates-list">
                {statusUpdates.slice(0, 10).map((u, i) => (
                  <li key={i} className="status-update-item">
                    <span className="status-update__title">{u.title}</span>
                    <span className="status-update__company">{u.company}</span>
                    <span className={`status-update__badge status-update__badge--${u.status.toLowerCase().replace(/\s/g, '-')}`}>
                      {u.status}
                    </span>
                    <span className="status-update__date">
                      {new Date(u.updatedAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
    </div>
  );
}
