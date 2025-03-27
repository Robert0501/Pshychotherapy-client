import React, { useEffect, useState } from 'react';

import '../../styles/study.css';
import StudyCard from '../../components/studies/study.card.tsx';
import StudyModel from '../../models/models/study-model.ts';

function StudyPage() {

  const [studies, setStudies] = useState<StudyModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://localhost:7053/api/Award/all');
        const result = await response.json();
        setStudies(result); 
    };

    fetchData();
  }, []);

  return (
    <div className="container--study">
      {studies.map((event, index) => (
        <StudyCard
          key={index}
          id={event.id}
          title={event.title}
          authority={event.authority}
          dateStarted={event.dateStarted}
          dateCompleted={event.dateCompleted}
        />
      ))}
    </div>
  );
}
export default StudyPage;
