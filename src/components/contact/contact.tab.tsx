import React from 'react';

import '../../styles/contact.css';
import contactInformationEnum from '../../models/enums/contactInformationEnum.ts';

interface ContactTabProps {
  contactInformation: ContactInformationModel;
}

function ContactTab(props: ContactTabProps) {
  function openGoogleMaps(location: string) {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
    const url = `${baseUrl}${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  }

  function sendEmailTo(email: string) {
    window.location.href = `mailto:${email}`;
  }

  function openSocialMediaAccount(url?: string) {
    window.open(url, '_blank');
  }

  const handleOnClick = (type: number, description: string, url?: string) => {
    switch (type) {
      case contactInformationEnum.LOCATION: {
        openGoogleMaps(description);
        break;
      }
      case contactInformationEnum.EMAIL: {
        sendEmailTo(description);
        break;
      }
      case contactInformationEnum.SOCIAL_MEDIA: {
        openSocialMediaAccount(url);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      className="contact-container"
      onClick={() =>
        handleOnClick(
          props.contactInformation.type,
          props.contactInformation.description,
          props.contactInformation.url
        )
      }
    >
      <props.contactInformation.icon className="contact-logo" />
      <div className="contact-text">
        <p>{props.contactInformation.title}</p>
        <p>{props.contactInformation.description}</p>
      </div>
    </div>
  );
}

export default ContactTab;
