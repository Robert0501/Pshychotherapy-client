import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditAppointmentsPopup({
  isEditPopupOpen,
  onClickClosePopup,
  appointment,
  onSaveSuccess,
}) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(
    appointment?.appointmentDate
      ? new Date(appointment.appointmentDate)
      : new Date()
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDateTime(date);
    }
  };

  if (!isEditPopupOpen || !appointment) return null;

  const editAppointment = async () => {
    const updatedAppointment = {
      id: appointment.id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      theraphy: appointment.theraphy,
      appointmentDate: selectedDateTime.toISOString(),
      status: 1,
      dateCreated: appointment.dateCreated,
      dateUpdated: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://localhost:7053/api/Appointment', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(updatedAppointment),
      });

      if (!response.ok) {
        throw new Error(`Failed to update appointment: ${response.statusText}`);
      }

      onSaveSuccess(updatedAppointment);
      onClickClosePopup();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClickClosePopup}>
          ×
        </button>
        <h2 className="modal-title">
          Modifică programarea pentru {appointment.name}
        </h2>
        <form className="form-container">
          <div className="form-group">
            <label htmlFor="appointmentDate">Data și Ora:</label>
            <DatePicker
              selected={selectedDateTime}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              timeIntervals={15}
              className="date-picker-input"
              minDate={new Date()}
            />
          </div>
          <button
            type="button"
            className="submit-button"
            onClick={editAppointment}
          >
            Salvează Modificările
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAppointmentsPopup;
