import React from 'react';

interface ArticleProps {
  title: string;
  description: string;
  publishedDate: string;
}

function Article({ title, description, publishedDate }) {
  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>
      <p className="article-date">Publicat pe: {publishedDate}</p>
      <hr />
      <p className="article-description">{description}</p>
    </div>
  );
}

export default Article;
