import React from 'react';

interface StudyCardProps {
  title: string;
  description: string;
  year: string;
}

function StudyCard(props: StudyCardProps) {
  return (
    <div className="study">
      <p className="study--title">{props.title}</p>
      <p>{props.description}</p>
      <p className="study--year">{props.year}</p>
    </div>
  );
}

export default StudyCard;
