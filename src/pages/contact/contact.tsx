import React, { useState } from 'react';

import { ReactComponent as LocationLogo } from '../../assets/icons/location.svg';
import { ReactComponent as MailLogo } from '../../assets/icons/email.svg';
import { ReactComponent as ZoomLogo } from '../../assets/icons/zoom.svg';
import { ReactComponent as FacebookLogo } from '../../assets/icons/facebook.svg';
import { ReactComponent as LinkedInLogo } from '../../assets/icons/linkedin.svg';

import '../../styles/contact.css';
import ContactTab from '../../components/contact/contact.tab.tsx';
import contactInformationEnum from '../../models/enums/contactInformationEnum.ts';

function ContactPage() {
  const [contactInformation, setContactInformation] = useState<
    ContactInformationModel[]
  >([
    {
      title: 'Locatie',
      description: 'Strada Emil Isac 10, Cluj-Napoca, Romania',
      url: undefined,
      icon: LocationLogo,
      type: contactInformationEnum.LOCATION,
    },
    {
      title: 'Adresa de email',
      description: 'jurjpatricia@gmail.com',
      url: undefined,
      icon: MailLogo,
      type: contactInformationEnum.EMAIL,
    },
    {
      title: 'Sesiuni online',
      description: 'Zoom',
      url: undefined,
      icon: ZoomLogo,
      type: contactInformationEnum.ONLINE_MEETING,
    },
    {
      title: 'Facebook',
      description: 'Jurj Patricia - Cabinet individual de psihologie',
      url: 'https://www.facebook.com/people/Jurj-Patricia-Cabinet-individual-de-psihologie/61565232010329/',
      icon: FacebookLogo,
      type: contactInformationEnum.SOCIAL_MEDIA,
    },
    {
      title: 'LinkedIn',
      description: 'Patricia Jurj',
      url: 'https://www.linkedin.com/in/patricia-jurj-384053256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      icon: LinkedInLogo,
      type: contactInformationEnum.SOCIAL_MEDIA,
    },
  ]);

  return (
    <div className="contact-wrapper">
      {contactInformation.map((contact, index) => (
        <ContactTab key={index} contactInformation={contact} />
      ))}
    </div>
  );
}

export default ContactPage;
