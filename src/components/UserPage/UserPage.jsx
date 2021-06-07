import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Welcome, {user.username}!</h2>
      <div style={{textAlign: 'center'}}>
        <LogOutButton className="btn" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
