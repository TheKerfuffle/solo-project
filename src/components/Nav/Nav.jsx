import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import Grid from '../Grid/Grid';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
      <table className="nav-title">
                <tbody>
                <tr>
                        <td className="navLetter">P</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">u</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">z</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">z</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">l</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">e</td>
                        <td className="navLetter"></td>
                    </tr>
                    <tr>
                        <td className="navLetter"></td>
                        <td className="navLetter">P</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">l</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">e</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">a</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">s</td>
                        <td className="navLetter"></td>
                        <td className="navLetter">e</td>
                    </tr>
                </tbody>
            </table>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/play">
              Play
            </Link>
            <Link className="navLink" to="/add">
              Add
            </Link>
            <Link className="navLink" to="/profile">
              Profile
            </Link>
            <Link className="navLink" to="/info">
              Info
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
