import React, { useEffect, useState } from 'react';
import '../../../styles/table.css';
import AppointmentsTable from '../../../components/appointments/appointments-table.tsx';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  theraphy: string;
  appointmentDate: Date | null;
  status: number;
  dateCreated: Date;
  dateUpdated: Date;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Patient[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Patient | null>(null);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve token from localStorage (or any other storage method)

        console.log(token);

        const response = await fetch('https://localhost:7053/api/Appointment', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setAppointments(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onEditClick = (appointment: Patient) => {
    setSelectedAppointment(appointment);
    setEditPopupOpen(true);
  };

  const onClickClosePopup = () => {
    setEditPopupOpen(false);
    setSelectedAppointment(null);
  };

  const onSaveSuccess = (updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt.id === updatedAppointment.id ? updatedAppointment : appt
      )
    );
  };

  return (
    <AppointmentsTable
      appointments={appointments}
      isEditPopupOpen={isEditPopupOpen}
      onEditClick={onEditClick}
      onClickClosePopup={onClickClosePopup}
      selectedAppointment={selectedAppointment}
      onSaveSuccess={onSaveSuccess}
    />
  );
};

export default AppointmentsPage;
