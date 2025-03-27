import React from 'react';
import EditAppointmentsPopup from '../pop-up/edit-appointments-popup.tsx';

function AppointmentsTable({
  appointments,
  isEditPopupOpen,
  onEditClick,
  onClickClosePopup,
  selectedAppointment,
  onSaveSuccess,
}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Therapy</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.theraphy}</td>
              <td>
                {appointment.appointmentDate
                  ? new Date(appointment.appointmentDate).toLocaleString()
                  : 'N/A'}
              </td>
              <td>{appointment.status === 0 ? 'Inactive' : 'Active'}</td>
              <td>{new Date(appointment.dateCreated).toLocaleString()}</td>
              <td>{new Date(appointment.dateUpdated).toLocaleString()}</td>
              <td
                className="edit-text"
                onClick={() => onEditClick(appointment)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditPopupOpen && selectedAppointment && (
        <EditAppointmentsPopup
          isEditPopupOpen={isEditPopupOpen}
          onClickClosePopup={onClickClosePopup}
          appointment={selectedAppointment}
          onSaveSuccess={onSaveSuccess}
        />
      )}
    </>
  );
}

export default AppointmentsTable;
