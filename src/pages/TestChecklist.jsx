import React, { useState, useCallback } from 'react';
import { TopBar, ContextHeader, MainContent, PrimaryWorkspace, SecondaryPanel, SecondaryPanelSection, ProofFooter, Button } from '../design-system';
import { TEST_ITEMS, getTestStatuses, toggleTestStatus, resetTestStatuses, getPassedCount, allTestsPassed } from '../utils/testChecklist';

function TestItem({ item, isChecked, onToggle }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="test-item">
      <label className="test-item__label">
        <input
          type="checkbox"
          className="test-item__checkbox"
          checked={isChecked}
          onChange={() => onToggle(item.id)}
        />
        <span className={`test-item__text ${isChecked ? 'test-item__text--checked' : ''}`}>
          {item.label}
        </span>
      </label>
      <button
        type="button"
        className="test-item__tooltip-trigger"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="How to test"
      >
        ?
      </button>
      {showTooltip && (
        <div className="test-item__tooltip">
          <strong>How to test:</strong>
          <p>{item.howToTest}</p>
        </div>
      )}
    </div>
  );
}

export default function TestChecklist() {
  const [statuses, setStatuses] = useState(getTestStatuses);

  const passedCount = getPassedCount(statuses);
  const totalCount = TEST_ITEMS.length;
  const allPassed = allTestsPassed(statuses);

  const handleToggle = useCallback((testId) => {
    const newStatuses = toggleTestStatus(testId);
    setStatuses({ ...newStatuses });
  }, []);

  const handleReset = useCallback(() => {
    const newStatuses = resetTestStatuses();
    setStatuses({ ...newStatuses });
  }, []);

  return (
    <div className="app-shell">
      <TopBar
        progress="Step 7 / 8"
        status={allPassed ? "Complete" : "In Progress"}
        statusVariant={allPassed ? "success" : "warning"}
        showNav
      />
      <ContextHeader
        headline="Test Checklist"
        subtext="Verify all features work correctly before shipping."
      />
      <MainContent>
        <PrimaryWorkspace>
          <div className="test-summary">
            <div className={`test-summary__count ${allPassed ? 'test-summary__count--complete' : ''}`}>
              Tests Passed: {passedCount} / {totalCount}
            </div>
            {!allPassed && (
              <div className="test-summary__warning">
                Resolve all issues before shipping.
              </div>
            )}
            {allPassed && (
              <div className="test-summary__success">
                All tests passed! You may proceed to Ship.
              </div>
            )}
          </div>

          <div className="test-checklist">
            {TEST_ITEMS.map((item) => (
              <TestItem
                key={item.id}
                item={item}
                isChecked={statuses[item.id] || false}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <div className="test-actions">
            <Button variant="secondary" onClick={handleReset}>
              Reset Test Status
            </Button>
          </div>
        </PrimaryWorkspace>
        <SecondaryPanel>
          <SecondaryPanelSection label="Instructions">
            <p className="secondary-panel__text">
              Go through each test item manually. Check the box once verified. Hover over the "?" icon for specific test instructions.
            </p>
          </SecondaryPanelSection>
          <SecondaryPanelSection label="Ship Lock">
            <p className="secondary-panel__text">
              The Ship page is locked until all 10 tests are checked. This ensures quality before deployment.
            </p>
          </SecondaryPanelSection>
        </SecondaryPanel>
      </MainContent>
      <ProofFooter
        items={[
          { id: 'ui', label: 'UI Built', complete: true },
          { id: 'logic', label: 'Logic Working', complete: true },
          { id: 'test', label: 'Test Passed', complete: allPassed },
          { id: 'deploy', label: 'Deployed', complete: false },
        ]}
      />
    </div>
  );
}
