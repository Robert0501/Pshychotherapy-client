import React from 'react';

import '../../styles/study.css';
import StudyCard from '../../components/studies/study.card.tsx';

function StudyPage() {
  const events = [
    {
      year: '2024',
      title: 'Analiza comportamentală aplicată în TSA',
      description: 'Asociatia pentru intervenție terapeutică în autism',
    },
    {
      year: '2023',
      title:
        'Atestat de liberă practică - psihoterapie cognitiv comportamentală',
      description: 'Colegiul Psihologilor din România',
    },
    {
      year: '2019 - 2021',
      title: 'Diplomă de master',
      description:
        'Facultatea de Psihologie și Științele Educației - Universitatea Babes-Bolyai, Cluj-Napoca',
    },
    {
      year: '2016 - 2019',
      title: 'Diplomă de licență',
      description:
        'Facultatea de Psihologie și Științele Educației - Universitatea Babes-Bolyai, Cluj-Napoca',
    },
    {
      year: '2016 - 2019',
      title: 'Diplomă de licență',
      description:
        'Facultatea de Psihologie și Științele Educației - Universitatea Babes-Bolyai, Cluj-Napoca ',
    },
  ];

  return (
    <div className="container--study">
      {events.map((event, index) => (
        <StudyCard
          key={index}
          title={event.title}
          description={event.description}
          year={event.year}
        />
      ))}
    </div>
  );
}
export default StudyPage;
