import React, { useEffect, useState } from 'react';
import Article from '../../components/articles/article-card.tsx';

import '../../styles/articles.css';
import ArticleModel from '../../models/models/article-model.ts';

const ArticlesPage = () => {
  const [articles, setArticles] = useState<ArticleModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://localhost:7053/api/Article');
        const result = await response.json();
        setArticles(result); 
    };

    fetchData();
  }, []);

  return (
    <div className="articles-page">
      {articles.map((article, index) => (
        <Article
          key={index}
          title={article.title}
          description={article.description}
          publishedDate={article.dateCreated}
        />
      ))}
    </div>
  );
};

export default ArticlesPage;
