import React, { useState } from 'react';

interface EditServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  serviceData: {
    id: number;
    title: string;
    duration: string;
    price: number;
    primaryObjectives: string[];
    secondaryObjectives: string[];
  };
}

const EditServicePopup: React.FC<EditServicePopupProps> = ({
  isOpen,
  onClose,
  serviceData,
}) => {
  const [formData, setFormData] = useState({ ...serviceData });
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
      const response = await fetch(`https://localhost:7053/api/Theraphy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update service.');

      onClose(); // Close popup on success
      window.location.reload(); // Reload to show updated service
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-scrollable">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Edit Service</h2>

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
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Primary Objectives (comma-separated)</label>
            <textarea
              name="primaryObjectives"
              value={formData.primaryObjectives.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  primaryObjectives: e.target.value.split(', '),
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Secondary Objectives (comma-separated)</label>
            <textarea
              name="secondaryObjectives"
              value={formData.secondaryObjectives.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  secondaryObjectives: e.target.value.split(', '),
                })
              }
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

export default EditServicePopup;
