import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TopBar, ContextHeader, MainContent, PrimaryWorkspace, SecondaryPanel, SecondaryPanelSection, ProofFooter, Button } from '../design-system';
import { getTestStatuses, allTestsPassed, getPassedCount, TEST_ITEMS } from '../utils/testChecklist';

export default function Ship() {
  const [statuses, setStatuses] = useState(getTestStatuses);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const currentStatuses = getTestStatuses();
    setStatuses(currentStatuses);
    setIsUnlocked(allTestsPassed(currentStatuses));
  }, []);

  const passedCount = getPassedCount(statuses);
  const totalCount = TEST_ITEMS.length;

  if (!isUnlocked) {
    return (
      <div className="app-shell">
        <TopBar
          progress="Step 8 / 8"
          status="Locked"
          statusVariant="error"
          showNav
        />
        <ContextHeader
          headline="Ship"
          subtext="Deploy your application to production."
        />
        <MainContent>
          <PrimaryWorkspace>
            <div className="ship-locked">
              <div className="ship-locked__icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2 className="ship-locked__title">Ship Locked</h2>
              <p className="ship-locked__message">
                Complete all tests before shipping.
              </p>
              <p className="ship-locked__status">
                Tests Passed: {passedCount} / {totalCount}
              </p>
              <Link to="/jt/07-test">
                <Button variant="primary">Go to Test Checklist</Button>
              </Link>
            </div>
          </PrimaryWorkspace>
          <SecondaryPanel>
            <SecondaryPanelSection label="Why locked?">
              <p className="secondary-panel__text">
                Shipping is blocked until all 10 test items are verified. This ensures quality and prevents deploying broken features.
              </p>
            </SecondaryPanelSection>
            <SecondaryPanelSection label="How to unlock">
              <p className="secondary-panel__text">
                Go to the Test Checklist page and verify each feature manually. Check all boxes to unlock shipping.
              </p>
            </SecondaryPanelSection>
          </SecondaryPanel>
        </MainContent>
        <ProofFooter
          items={[
            { id: 'ui', label: 'UI Built', complete: true },
            { id: 'logic', label: 'Logic Working', complete: true },
            { id: 'test', label: 'Test Passed', complete: false },
            { id: 'deploy', label: 'Deployed', complete: false },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <TopBar
        progress="Step 8 / 8"
        status="Ready"
        statusVariant="success"
        showNav
      />
      <ContextHeader
        headline="Ship"
        subtext="All tests passed. Your application is ready to deploy."
      />
      <MainContent>
        <PrimaryWorkspace>
          <div className="ship-unlocked">
            <div className="ship-unlocked__icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="ship-unlocked__title">Ready to Ship!</h2>
            <p className="ship-unlocked__message">
              All {totalCount} tests have been verified. Your application is ready for deployment.
            </p>
            <div className="ship-unlocked__actions">
              <Button variant="primary" onClick={() => alert('Deploy functionality would go here. Connect to your CI/CD pipeline or hosting provider.')}>
                Deploy to Production
              </Button>
            </div>
            <div className="ship-checklist-summary">
              <h3>Verified Tests:</h3>
              <ul>
                {TEST_ITEMS.map(item => (
                  <li key={item.id} className="ship-checklist-summary__item">
                    <span className="ship-checklist-summary__check">✓</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PrimaryWorkspace>
        <SecondaryPanel>
          <SecondaryPanelSection label="Deployment options">
            <p className="secondary-panel__text">
              You can deploy to Vercel, Netlify, or any static hosting provider. Run "npm run build" to generate production files.
            </p>
          </SecondaryPanelSection>
          <SecondaryPanelSection label="Post-deployment">
            <p className="secondary-panel__text">
              After deploying, verify the live site works as expected. Monitor for any production-only issues.
            </p>
          </SecondaryPanelSection>
        </SecondaryPanel>
      </MainContent>
      <ProofFooter
        items={[
          { id: 'ui', label: 'UI Built', complete: true },
          { id: 'logic', label: 'Logic Working', complete: true },
          { id: 'test', label: 'Test Passed', complete: true },
          { id: 'deploy', label: 'Deployed', complete: false },
        ]}
      />
    </div>
  );
}
