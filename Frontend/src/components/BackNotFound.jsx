import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackNotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <button onClick={handleBackClick} type="button" name="back" className="back-button">
      Go Back
    </button>
  );
};

export default BackNotFound;
