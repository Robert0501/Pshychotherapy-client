import React from 'react';
import convertStringToDate from '../../utils/date';

interface ArticleProps {
  title: string;
  description: string;
  publishedDate: string;
  onClick?: () => void; // Callback function to trigger on click
}

function Article({ title, description, publishedDate, onClick }: ArticleProps) {
  return (
    <div className="article-card" onClick={onClick}>
      <h2 className="article-title">{title}</h2>
      <p className="article-date">
        Publicat: {convertStringToDate(publishedDate)}
      </p>
      <hr />
      <p className="article-description">{description}</p>
    </div>
  );
}

export default Article;
