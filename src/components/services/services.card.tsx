import React, { useState } from 'react';
import ServiceModel from '../../models/models/service-model';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PriceIcon } from '../../assets/icons/payment.svg';
import { ReactComponent as DurationIcon } from '../../assets/icons/clock.svg';

import SchedulePopup from '../pop-up/schedule.popup.tsx';

interface ServiceCardProps {
  serviceCard: ServiceModel;
}

function ServiceCard(props: ServiceCardProps) {
  const { t } = useTranslation();

  const [isPopupOpened, setPopupOpened] = useState(false);

  const openPopup = () => {
    setPopupOpened(true);
  };

  const closePopup = () => {
    setPopupOpened(false);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitter with data: ', formData);
    alert(
      `Vizita pentru ${props.serviceCard.title} a fost inregistrata, terapeutul o sa va contacteze pentru a stabili data si ora`
    );
    closePopup();
  };

  return (
    <>
      <div className="card">
        <h2 className="title">{props.serviceCard.title}</h2>
        <hr />
        <div className="info">
          <div className="info-item">
            <DurationIcon className="icon" />
            <span className="label">{t('services.duration')}</span>
            <span className="value">{props.serviceCard.duration}</span>
          </div>
          <div className="info-item">
            <PriceIcon className="icon" />
            <span className="label">{t('services.price')}</span>
            <span className="value">
              {props.serviceCard.price} {t('services.currency')}
            </span>
          </div>
        </div>
        <hr />
        <div className="objectives">
          <h3 className="section-title">{t('services.primary_objectives')}</h3>
          <ul className="objective-list primary">
            {props.serviceCard.primaryObjectives.map((objective, index) => (
              <li className="objective" key={index}>
                {objective}
              </li>
            ))}
          </ul>

          <h3 className="section-title">
            {t('services.secundary_objectives')}
          </h3>
          <ul className="objective-list secondary">
            {props.serviceCard.secundaryObjectives.map((objective, index) => (
              <li className="objective" key={index}>
                {objective}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="schedule-container">
          <button className="schedule-btn" onClick={openPopup}>
            Programează o vizită
          </button>
        </div>
      </div>
      {isPopupOpened && (
        <SchedulePopup
          isOpen={isPopupOpened}
          onClose={closePopup}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

export default ServiceCard;
