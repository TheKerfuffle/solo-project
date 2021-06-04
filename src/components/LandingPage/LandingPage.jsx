import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

// MUI Core: 
import {
  Paper, Typography, List,
  Toolbar, AppBar, CssBaseline,
  Drawer, Button, IconButton,
  Divider, Grid, Tooltip
} from '@material-ui/core/';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');

  return (
    <div className="container">
      
      <h2>{heading}</h2>

      <Grid container>
        <Grid item xs={12} sm={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RegisterForm />
        </Grid>
      </Grid>

    </div>
  );
}

export default LandingPage;
