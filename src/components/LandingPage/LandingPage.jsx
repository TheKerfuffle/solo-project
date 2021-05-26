import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');

  return (
    <div className="container">
      <h2>{heading}</h2>
      
      <div className="grid">
        <div className="grid-col">
          <LoginForm />
        </div>
      </div>

      <div className="grid">
        <div className="grid-col">
          <RegisterForm />
        </div>
      </div>
      
    </div>
  );
}

export default LandingPage;
