import React, { useState } from 'react';

interface EditArticlePopupProps {
  isOpen: boolean;
  onClose: () => void;
  articleData: {
    id: number;
    title: string;
    description: string;
  };
  onArticleUpdated: () => void; // Callback to refresh articles
}

const EditArticlePopup: React.FC<EditArticlePopupProps> = ({
  isOpen,
  onClose,
  articleData,
  onArticleUpdated,
}) => {
  const [formData, setFormData] = useState({ ...articleData });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`https://localhost:7053/api/Article`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update article');

      onArticleUpdated(); // Refresh article list
      onClose(); // Close popup
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Edit Article</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticlePopup;
