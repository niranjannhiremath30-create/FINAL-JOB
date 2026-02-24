import React, { useState, useEffect } from 'react';
import { getPreferences, savePreferences } from '../utils/preferences';
import { getTestStatuses, allTestsPassed } from '../utils/testChecklist';
import { TopBar, ContextHeader, MainContent, PrimaryWorkspace, SecondaryPanel, SecondaryPanelSection, ProofFooter, Button } from '../design-system';

const LOCATIONS = ["Bangalore", "Mumbai", "Chennai", "Hyderabad", "Delhi NCR", "Pune", "Noida", "Gurgaon"];
const EXPERIENCE_OPTIONS = ["", "Fresher", "0-1", "1-3", "3-5"];
const MODES = ["Remote", "Hybrid", "Onsite"];

export default function Settings() {
  const [roleKeywords, setRoleKeywords] = useState("");
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [preferredMode, setPreferredMode] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(40);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = getPreferences();
    if (p) {
      setRoleKeywords(p.roleKeywords || "");
      setPreferredLocations(p.preferredLocations || []);
      setPreferredMode(p.preferredMode || []);
      setExperienceLevel(p.experienceLevel || "");
      setSkills(p.skills || "");
      setMinMatchScore(Number(p.minMatchScore) || 40);
    }
  }, []);

  const toggleLocation = (loc) => {
    setPreferredLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleMode = (m) => {
    setPreferredMode((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePreferences({
      roleKeywords,
      preferredLocations,
      preferredMode,
      experienceLevel,
      skills,
      minMatchScore,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
        headline="Preferences"
        subtext="Set your job preferences to activate intelligent matching on the Dashboard."
      />
      <MainContent>
        <PrimaryWorkspace>
          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="settings-field">
              <label className="settings-label">Role keywords (comma-separated)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. React, Backend, Intern"
                value={roleKeywords}
                onChange={(e) => setRoleKeywords(e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label className="settings-label">Preferred locations (select multiple)</label>
              <div className="settings-multiselect">
                {LOCATIONS.map((loc) => (
                  <label key={loc} className="settings-check">
                    <input
                      type="checkbox"
                      checked={preferredLocations.includes(loc)}
                      onChange={() => toggleLocation(loc)}
                    />
                    {loc}
                  </label>
                ))}
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">Preferred mode</label>
              <div className="settings-checkgroup">
                {MODES.map((m) => (
                  <label key={m} className="settings-check">
                    <input
                      type="checkbox"
                      checked={preferredMode.includes(m)}
                      onChange={() => toggleMode(m)}
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>
            <div className="settings-field">
              <label className="settings-label">Experience level</label>
              <select
                className="input settings-select"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt || "all"} value={opt}>
                    {opt || "— Select —"}
                  </option>
                ))}
              </select>
            </div>
            <div className="settings-field">
              <label className="settings-label">Skills (comma-separated)</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Java, React, SQL"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label className="settings-label">
                Minimum match score: {minMatchScore}
              </label>
              <input
                type="range"
                className="settings-slider"
                min={0}
                max={100}
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
              />
            </div>
            <div className="settings-actions">
              <Button type="submit" variant="primary">
                {saved ? "Saved" : "Save preferences"}
              </Button>
            </div>
          </form>
        </PrimaryWorkspace>
        <SecondaryPanel>
          <SecondaryPanelSection label="How matching works">
            <p className="secondary-panel__text">
              Your preferences are used to compute a match score for each job. Higher scores mean better fit. Use the minimum score threshold to filter results.
            </p>
          </SecondaryPanelSection>
          <SecondaryPanelSection label="Score breakdown">
            <p className="secondary-panel__text">
              Role in title (+25), in description (+15), location (+15), mode (+10), experience (+10), skills overlap (+15), recent post (+5), LinkedIn (+5). Cap: 100.
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
    </div>
  );
}
