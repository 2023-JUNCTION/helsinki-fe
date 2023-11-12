import React from 'react';
import { useNavigate } from 'react-router-dom';

const Alert = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/mission')}
      style={{
        display: 'flex',

        height: '100vh',
      }}
    >
      <img src="/alert.png" alt="alert" style={{ objectFit: 'cover', width: '100%' }} />
    </button>
  );
};

export default Alert;
