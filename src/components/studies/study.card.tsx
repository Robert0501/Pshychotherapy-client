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
      <hr />
      <p>{props.description}</p>
      <hr />
      <p className="study--year">{props.year}</p>
    </div>
  );
}

export default StudyCard;
