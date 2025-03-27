import React from "react";

function ConfirmationPopup ({isOpen, onClose, title, text}){

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              ×
            </button>
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="submit" className="submit-button" onClick={onClose}>
            Ok
          </button>
          </div>
        </div>
      );
}

export default ConfirmationPopup;