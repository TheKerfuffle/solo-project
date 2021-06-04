import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI Core: 
import {
  Paper, Typography, List,
  Toolbar, AppBar, CssBaseline,
  Drawer, Button, IconButton,
  Divider, Grid, Tooltip, TextField
} from '@material-ui/core/';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();


  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register New User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <TextField
          id="standard-basic"
          name="username"
          value={username}
          required
          label="Username"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          name="password"
          value={password}
          required
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <Button
          type="submit"
          name="submit"
          variant="contained"
          onClick={registerUser}
          style={{ marginTop: 20, color: 'white', backgroundColor: 'maroon' }}
        >
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
