/**
 * Layout structure components
 * Follows: [Top Bar] → [Context Header] → [Primary (70%)] + [Secondary (30%)] → [Proof Footer]
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function TopBar({ progress, status, statusVariant = 'default', showNav }) {
  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <Link to="/" className="top-bar__brand">Job Notification App</Link>
        {showNav && (
          <nav className="top-bar__nav">
            <Link to="/dashboard" className="top-bar__nav-link">Dashboard</Link>
            <Link to="/saved" className="top-bar__nav-link">Saved</Link>
            <Link to="/digest" className="top-bar__nav-link">Digest</Link>
            <Link to="/settings" className="top-bar__nav-link">Settings</Link>
          </nav>
        )}
      </div>
      {progress != null && (
        <div className="top-bar__progress">{progress}</div>
      )}
      <div className="top-bar__right">
        {status && (
          <span className={`badge badge-${statusVariant === 'default' ? 'status' : statusVariant}`}>
            {status}
          </span>
        )}
      </div>
    </header>
  );
}

export function ContextHeader({ headline, subtext }) {
  return (
    <div className="context-header">
      <h1 className="context-header__headline">{headline}</h1>
      {subtext && (
        <p className="context-header__subtext">{subtext}</p>
      )}
    </div>
  );
}

export function MainContent({ children }) {
  return (
    <main className="main-content">
      {children}
    </main>
  );
}

export function PrimaryWorkspace({ children }) {
  return (
    <div className="primary-workspace">
      {children}
    </div>
  );
}

export function SecondaryPanel({ children }) {
  return (
    <aside className="secondary-panel">
      {children}
    </aside>
  );
}

export function SecondaryPanelSection({ label, children }) {
  return (
    <div className="secondary-panel__section">
      {label && (
        <p className="secondary-panel__label">{label}</p>
      )}
      {children}
    </div>
  );
}

export function ProofFooter({ items = [] }) {
  const defaultItems = [
    { id: 'ui', label: 'UI Built', complete: false },
    { id: 'logic', label: 'Logic Working', complete: false },
    { id: 'test', label: 'Test Passed', complete: false },
    { id: 'deploy', label: 'Deployed', complete: false },
  ];
  const list = items.length ? items : defaultItems;

  return (
    <footer className="proof-footer">
      <p className="proof-footer__title">Proof</p>
      <ul className="proof-footer__checklist">
        {list.map(({ id, label, complete }) => (
          <li
            key={id}
            className={`proof-footer__item ${complete ? 'proof-footer__item--complete' : ''}`}
          >
            <span className="proof-footer__checkbox" />
            {label}
          </li>
        ))}
      </ul>
    </footer>
  );
}
