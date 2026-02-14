import React from 'react';
import './AgeModal.css';

const AgeModal = ({ isOpen, onClose, onSubmit, age, setAge }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>How old is the child?</h3>
        <p>This helps the AI suggest age-appropriate play ideas.</p>
        <input 
          type="number" 
          step="0.1"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          placeholder="e.g., 2.5"
          autoFocus
        />
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={onSubmit}>Get Ideas</button>
        </div>
      </div>
    </div>
  );
};

export default AgeModal;