/**
 * Design System UI Components
 */

import React from 'react';

export function Button({ variant = 'primary', children, disabled, ...props }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ ...props }) {
  return <input className="input" {...props} />;
}

export function Card({ children, ...props }) {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
}

export function Badge({ variant = 'default', children }) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}

export function PromptBox({ value, placeholder, readOnly = true, ...props }) {
  return (
    <textarea
      className="prompt-box"
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={6}
      {...props}
    />
  );
}

export function ErrorState({ title, message, action }) {
  return (
    <div className="error-state">
      <p className="error-state__title">{title}</p>
      <p className="error-state__message">{message}</p>
      {action && <div className="error-state__action">{action}</div>}
    </div>
  );
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__message">{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
