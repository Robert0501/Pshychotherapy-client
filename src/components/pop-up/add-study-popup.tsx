import React, { useState } from 'react';

interface AddStudyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const AddStudyPopup: React.FC<AddStudyPopupProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    authority: '',
    dateStarted: '',
    dateCompleted: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close the popup on submit
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-scrollable">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Add New Study</h2>

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
            <label>Authority</label>
            <input
              type="text"
              name="authority"
              value={formData.authority}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date Started</label>
            <input
              type="text"
              name="dateStarted"
              value={formData.dateStarted}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date Completed</label>
            <input
              type="text"
              name="dateCompleted"
              value={formData.dateCompleted}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Study
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudyPopup;
