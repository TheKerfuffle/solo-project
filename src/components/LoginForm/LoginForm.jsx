import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// MUI Core: 
import {
  Paper, Typography, List,
  Toolbar, AppBar, CssBaseline,
  Drawer, Button, IconButton, Input,
  Divider, Grid, Tooltip, TextField
} from '@material-ui/core/';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
          onClick={login}
          style={{ marginTop: 20, color: 'white', backgroundColor: 'maroon' }}
        >
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
