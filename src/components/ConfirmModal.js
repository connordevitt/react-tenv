// src/components/ConfirmModal.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ConfirmModal({ show, handleClose, handleConfirm, taskText }) {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Task Removal</h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to remove the task: "{taskText}"?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
