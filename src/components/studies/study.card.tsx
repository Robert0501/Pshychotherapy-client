import React from 'react';
import StudyModel from '../../models/models/study-model';

function StudyCard(props: StudyModel) {
  return (
    <div className="study">
      <p className="study--title">{props.title}</p>
      <hr />
      <p>{props.authority}</p>
      <hr />
      <p className="study--year">
        {props.dateStarted !== props.dateCompleted ? `${props.dateStarted} - ${props.dateCompleted}` : `${props.dateCompleted}`}
      </p>

    </div>
  );
}

export default StudyCard;
