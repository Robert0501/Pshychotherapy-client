import React, { useState } from 'react';

import '../../styles/services.css';
import ServiceCard from '../../components/services/services.card.tsx';
import ServiceModel from '../../models/models/service-model.ts';

function ServicePage() {
  const [services, setServices] = useState<ServiceModel[]>([
    {
      title: 'Psihoterapie individuală',
      duration: '01:00',
      price: 120,
      primaryObjectives: [
        'Anxietate şi Atacuri de panică',
        'Dezvoltarea abilităţilor de comunicare',
        'Depresie',
      ],
      secundaryObjectives: [
        'Dezvoltare personală',
        'Retragere din viaţa socială',
        'Stima de sine scăzută, devalorizare',
      ],
    },
    {
      title: 'Terapie de cuplu',
      duration: '01:30',
      price: 200,
      primaryObjectives: [
        'Îmbunătățirea comunicării în relație',
        'Gestionarea conflictelor',
        'Redobândirea încrederii',
      ],
      secundaryObjectives: [
        'Reconectare emoțională',
        'Planificarea unei vieți de cuplu echilibrate',
      ],
    },
    {
      title: 'Terapie pentru copii și adolescenți',
      duration: '00:50',
      price: 100,
      primaryObjectives: [
        'Gestionarea emoțiilor intense',
        'Adaptarea la schimbări (școală, divorțul părinților)',
        'Dezvoltarea încrederii în sine',
      ],
      secundaryObjectives: [
        'Creșterea abilităților sociale',
        'Reducerea comportamentelor problematice',
      ],
    },
    {
      title: 'Terapie pentru tulburări de anxietate',
      duration: '01:00',
      price: 150,
      primaryObjectives: [
        'Reducerea simptomelor de anxietate generalizată',
        'Abordarea fobiilor specifice',
        'Gestionarea stresului',
      ],
      secundaryObjectives: [
        'Îmbunătățirea somnului',
        'Creșterea stimei de sine',
      ],
    },
  ]);

  return (
    <div className="container">
      {services.map((service, index) => (
        <ServiceCard key={index} serviceCard={service} />
      ))}
    </div>
  );
}

export default ServicePage;
