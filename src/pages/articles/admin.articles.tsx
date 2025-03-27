import React, { useEffect, useState } from 'react';
import ArticleModel from '../../models/models/article-model.tsx';
import Article from '../../components/articles/article-card.tsx';
import AddArticlePopup from '../../components/pop-up/add-article-popup.tsx';
import EditArticlePopup from '../../components/pop-up/edit-article-popup.tsx';

function AdminArticles() {
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleModel | null>(
    null
  );

  const fetchArticles = async () => {
    const response = await fetch('https://localhost:7053/api/Article');
    const result = await response.json();
    setArticles(result);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="articles-page">
      <button
        className="btn-add-service"
        onClick={() => setIsAddPopupOpen(true)}
      >
        Adauga un nou articol
      </button>

      {articles.map((article) => (
        <div key={article.id} className="article-container">
          <Article
            title={article.title}
            description={article.description}
            publishedDate={article.dateCreated}
            onClick={() => {
              setSelectedArticle(article); // Set the article to be edited
              setIsEditPopupOpen(true); // Open the Edit Article Popup
            }}
          />
        </div>
      ))}

      {isAddPopupOpen && (
        <AddArticlePopup
          isOpen={isAddPopupOpen}
          onClose={() => setIsAddPopupOpen(false)}
          onArticleAdded={fetchArticles}
        />
      )}

      {isEditPopupOpen && selectedArticle && (
        <EditArticlePopup
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          articleData={selectedArticle}
          onArticleUpdated={fetchArticles}
        />
      )}
    </div>
  );
}

export default AdminArticles;
