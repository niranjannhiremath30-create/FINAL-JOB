import React, { useEffect } from 'react';

export default function Toast({ message, visible, onDismiss, duration = 3000 }) {
  useEffect(() => {
    if (!visible || !message) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [visible, message, duration, onDismiss]);

  if (!visible || !message) return null;

  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
}
