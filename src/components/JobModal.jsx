import React, { useEffect } from 'react';
import { Button } from '../design-system';

export default function JobModal({ job, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{job.title}</h3>
          <span className="modal__company">{job.company}</span>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal__body">
          <p className="modal__meta">
            {job.location} · {job.mode} · {job.experience}
          </p>
          <p className="modal__description">{job.description}</p>
          <p className="modal__label">Skills</p>
          <div className="modal__skills">
            {job.skills.map((s) => (
              <span key={s} className="modal__skill">{s}</span>
            ))}
          </div>
        </div>
        <div className="modal__footer">
          <Button variant="primary" onClick={() => window.open(job.applyUrl, '_blank')}>
            Apply
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
