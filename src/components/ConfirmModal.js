import React, { useEffect } from 'react';

function ConfirmationModal({ message, onConfirm, onCancel }) {
  // Focus management to bring modal into focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalMessage">
      <div className="modal-content" role="document">
        <h3 id="modalTitle">Confirmation</h3>
        <p id="modalMessage">{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
