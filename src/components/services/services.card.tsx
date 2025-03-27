import React, { useState } from 'react';
import ServiceModel from '../../models/models/service-model';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PriceIcon } from '../../assets/icons/payment.svg';
import { ReactComponent as DurationIcon } from '../../assets/icons/clock.svg';

import SchedulePopup from '../pop-up/schedule.popup.tsx';
import ConfirmationPopup from '../pop-up/confirmation.popup.tsx';
import EditServicePopup from '../../components/pop-up/edit.service.popup.tsx';

interface ServiceCardProps {
  serviceCard: ServiceModel;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceCard }) => {
  const { t } = useTranslation();

  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // New state
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState({
    title: '',
    text: '',
  });

  const isAuthenticated = localStorage.getItem('access_token');

  const toggleSchedulePopup = (isOpen: boolean) =>
    setIsSchedulePopupOpen(isOpen);
  const toggleEditPopup = (isOpen: boolean) => setIsEditPopupOpen(isOpen); // New function
  const toggleConfirmationPopup = (isOpen: boolean) =>
    setIsConfirmationPopupOpen(isOpen);

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await fetch('https://localhost:7053/api/Appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setConfirmationPopup({
          title: t('confirmation.successTitle'),
          text: t('confirmation.successText'),
        });
        return;
      }

      const responseJson = await response.json();
      const errorDetails = responseJson.details;

      const errorMappings: Record<string, { title: string; text: string }> = {
        AppointmentExists: {
          title: t('confirmation.conflictTitle'),
          text: t('confirmation.conflictText'),
        },
        InvalidEmail: {
          title: t('confirmation.invalidEmailTitle'),
          text: t('confirmation.invalidEmailText'),
        },
        InvalidPhone: {
          title: t('confirmation.invalidPhoneTitle'),
          text: t('confirmation.invalidPhoneText'),
        },
      };

      if (errorDetails && errorMappings[errorDetails]) {
        setConfirmationPopup(errorMappings[errorDetails]);
      } else {
        throw new Error(t('confirmation.genericError'));
      }
    } catch (error) {
      setConfirmationPopup({
        title: t('confirmation.errorTitle'),
        text: t('confirmation.genericError'),
      });
    } finally {
      toggleSchedulePopup(false);
      toggleConfirmationPopup(true);
    }
  };

  return (
    <>
      <div className="card">
        <h2 className="title">{serviceCard.title}</h2>
        <hr />
        <div className="info">
          <div className="info-item">
            <DurationIcon className="icon" />
            <span className="label">{t('services.duration')}</span>
            <span className="value">{serviceCard.duration}</span>
          </div>
          <div className="info-item">
            <PriceIcon className="icon" />
            <span className="label">{t('services.price')}</span>
            <span className="value">
              {serviceCard.price} {t('services.currency')}
            </span>
          </div>
        </div>
        <hr />
        <div className="objectives">
          <h3 className="section-title">{t('services.primary_objectives')}</h3>
          <ul className="objective-list primary">
            {serviceCard.primaryObjectives.map((objective, index) => (
              <li className="objective" key={index}>
                {objective}
              </li>
            ))}
          </ul>

          <h3 className="section-title">
            {t('services.secondary_objectives')}
          </h3>
          <ul className="objective-list secondary">
            {serviceCard.secondaryObjectives.map((objective, index) => (
              <li className="objective" key={index}>
                {objective}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="schedule-container">
          <button
            className="schedule-btn"
            onClick={() =>
              isAuthenticated
                ? toggleEditPopup(true)
                : toggleSchedulePopup(true)
            }
          >
            {isAuthenticated ? 'Editează' : t('services.scheduleVisit')}
          </button>
        </div>
      </div>

      {isSchedulePopupOpen && (
        <SchedulePopup
          isOpen={isSchedulePopupOpen}
          onClose={() => toggleSchedulePopup(false)}
          onSubmit={handleFormSubmit}
          theraphy={serviceCard.title}
        />
      )}

      {isEditPopupOpen && (
        <EditServicePopup
          isOpen={isEditPopupOpen}
          onClose={() => toggleEditPopup(false)}
          serviceData={serviceCard} // Pass existing service data to the edit form
        />
      )}

      {isConfirmationPopupOpen && (
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={() => toggleConfirmationPopup(false)}
          title={confirmationPopup.title}
          text={confirmationPopup.text}
        />
      )}
    </>
  );
};

export default ServiceCard;
