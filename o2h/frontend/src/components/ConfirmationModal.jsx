import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dim backdrop layer */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} onClick={onClose}></div>
      
      {/* Modal panel */}
      <div className="modal fade show d-block" style={{ zIndex: 1055, top: '20%' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content glass-card p-3">
            <div className="modal-header border-0 pb-1">
              <h5 className="modal-title fw-bold text-danger">⚠️ Delete Task?</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body py-2">
              <p className="mb-0">Are you sure you want to delete <strong>"{taskTitle}"</strong>?</p>
            </div>
            <div className="modal-footer border-0 pt-2 gap-2 d-flex justify-content-end">
              <button className="btn btn-sm btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-sm btn-danger" onClick={onConfirm}>Delete Task</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
