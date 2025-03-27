import React, { useState } from 'react';

interface AddArticlePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleAdded: () => void; // Callback to refresh articles
}

const AddArticlePopup: React.FC<AddArticlePopupProps> = ({
  isOpen,
  onClose,
  onArticleAdded,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // Don't render if not open

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://localhost:7053/api/Article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to add article');

      onArticleAdded(); // Refresh article list
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
        <h2 className="modal-title">Add New Article</h2>

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
            {loading ? 'Saving...' : 'Save Article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticlePopup;
