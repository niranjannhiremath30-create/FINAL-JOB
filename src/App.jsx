/**
 * Design System Demo — Showcases layout structure and components
 * No product features. Foundation only.
 */

import React from 'react';
import {
  TopBar,
  ContextHeader,
  MainContent,
  PrimaryWorkspace,
  SecondaryPanel,
  SecondaryPanelSection,
  ProofFooter,
  Button,
  Input,
  Card,
  PromptBox,
} from './design-system';

export default function App() {
  return (
    <div className="app-shell">
      <TopBar
        progress="Step 1 / 4"
        status="In Progress"
        statusVariant="warning"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="A calm, intentional foundation for the Job Notification App. Components and layout structure ready for product development."
      />

      <MainContent>
        <PrimaryWorkspace>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card>
              <h3 style={{ marginBottom: '16px' }}>Primary Workspace</h3>
              <p style={{ marginBottom: '16px' }}>
                Clean cards with predictable components. Subtle borders, no heavy shadows.
                Content sits here with intentional whitespace.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </Card>

            <Card>
              <h4 style={{ marginBottom: '16px' }}>Form Elements</h4>
              <Input
                placeholder="Enter value..."
                style={{ marginBottom: '16px' }}
              />
              <Input placeholder="Disabled input" disabled />
            </Card>
          </div>
        </PrimaryWorkspace>

        <SecondaryPanel>
          <SecondaryPanelSection label="Step explanation">
            <p className="secondary-panel__text">
              This panel holds step guidance, copyable prompts, and supporting actions.
              Consistently styled across all views.
            </p>
            <PromptBox
              value="Example copyable prompt text. Select and copy with Ctrl+C."
              placeholder="Prompt will appear here..."
            />
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <Button variant="secondary" style={{ flex: 1 }}>
                Copy
              </Button>
            </div>
          </SecondaryPanelSection>
        </SecondaryPanel>
      </MainContent>

      <ProofFooter
        items={[
          { id: 'ui', label: 'UI Built', complete: true },
          { id: 'logic', label: 'Logic Working', complete: false },
          { id: 'test', label: 'Test Passed', complete: false },
          { id: 'deploy', label: 'Deployed', complete: false },
        ]}
      />
    </div>
  );
}
