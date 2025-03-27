import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/pop-up.css';

function SchedulePopup({ isOpen, onClose, onSubmit, theraphy }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      theraphy: theraphy
    };
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className='modal-title'>Programeaza o vizita</h2>
        <form onSubmit={handleSubmit} className='form-container'>
          <div className="form-group">
            <label htmlFor="name">Nume:</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon:</label>
            <input type="text" name="phone" id="phone" required />
          </div>
          <button type="submit" className="submit-button">
            Programeaza
          </button>
        </form>
      </div>
    </div>
  );
}

export default SchedulePopup;
