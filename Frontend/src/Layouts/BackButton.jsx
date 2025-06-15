import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);  
  };

  return (
    <button onClick={handleBackClick} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white' }}>
      Go Back
    </button>
  );
};

export default BackButton;