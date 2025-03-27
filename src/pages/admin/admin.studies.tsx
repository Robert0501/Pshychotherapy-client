import React, { useEffect, useState } from 'react';

import '../../styles/study.css';
import StudyCard from '../../components/studies/study.card.tsx';
import StudyModel from '../../models/models/study-model.ts';
import AddStudyPopup from '../../components/pop-up/add-study-popup.tsx';

function AdminStudy() {
  const [studies, setStudies] = useState<StudyModel[]>([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    const response = await fetch('https://localhost:7053/api/Award/all');
    const result = await response.json();
    setStudies(result);
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const toggleAddPopup = () => {
    setIsAddPopupOpen((prev) => !prev);
  };

  // Handle adding a new study
  const handleAddStudy = async (formData: any) => {
    try {
      const response = await fetch('https://localhost:7053/api/Award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the study is successfully added, fetch the updated list
        fetchData(); // Fetch data again after submission to refresh the list
      }
    } catch (error) {
      console.error('Error adding study:', error);
    }
  };

  return (
    <div className="container--study">
      <button className="btn-add-service" onClick={toggleAddPopup}>
        Adauga o noua pregatire
      </button>

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

      <AddStudyPopup
        isOpen={isAddPopupOpen}
        onClose={toggleAddPopup}
        onSubmit={handleAddStudy}
      />
    </div>
  );
}

export default AdminStudy;
