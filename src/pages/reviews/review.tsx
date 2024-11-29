import React, { useState } from 'react';

function ReviewPage() {
  const [reviews, setReviews] = useState([
    {
      name: 'Ion Popescu',
      date: '2024-11-20',
      text: 'Foarte bun serviciu!',
      rating: 4,
    },
    {
      name: 'Maria Ionescu',
      date: '2024-11-21',
      text: 'Mă așteptam la mai mult.',
      rating: 3,
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: '',
    text: '',
    rating: 0,
  });

  // Funcția pentru adăugarea unei recenzii
  const handleAddReview = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Formatează data
    setReviews([...reviews, { ...newReview, date: currentDate }]);
    setNewReview({ name: '', text: '', rating: 0 }); // Resetarea câmpurilor
  };

  return <div></div>;
}

export default ReviewPage;
