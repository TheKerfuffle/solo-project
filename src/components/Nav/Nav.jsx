import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

// MUI Core:
import {
  Paper, Typography, List,
  Toolbar, AppBar, CssBaseline,
  Drawer, Button, IconButton,
  Divider, Grid, Tooltip
} from '@material-ui/core/';

// Icons:
import CasinoIcon from '@material-ui/icons/Casino';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';

// Mui Styles:
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles({
  navIconButton: {
    fontSize: 36
  },
});



function Nav() {


  const user = useSelector((store) => store.user);

  const classes = useStyles();

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
      <Tooltip title="home">
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
      </Tooltip>

      <div>
        {/* <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link> */}

        {user.id && (
          <>
            <Tooltip title="Random Puzzle">
              <Link className="navLink" to="/play">
                <IconButton
                  color="inherit"
                  aria-label="Play Random Puzzle"
                >
                  <CasinoIcon style={{ fontSize: 36, color: 'white' }} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="Add New Puzzle">
              <Link className="navLink" to="/add">
                <IconButton
                  color="inherit"
                  aria-label="Play Random Puzzle"
                >
                  <AddIcon style={{ fontSize: 36, color: 'white' }} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="Profile">
              <Link className="navLink" to="/profile">
                <IconButton
                  color="inherit"
                  aria-label="Play Random Puzzle"
                >
                  <PersonIcon style={{ fontSize: 36, color: 'white' }} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="How to Play">
              <Link className="navLink" to="/how">
                <IconButton
                  color="inherit"
                  aria-label="Play Random Puzzle"
                >
                  <HelpIcon style={{ fontSize: 36, color: 'white' }} />
                </IconButton>
              </Link>
            </Tooltip>

            <Tooltip title="Info Page">
              <Link className="navLink" to="/info">
                <IconButton
                  color="inherit"
                  aria-label="Play Random Puzzle"
                >
                  <InfoIcon style={{ fontSize: 36, color: 'white' }} />
                </IconButton>
              </Link>
            </Tooltip>

            <LogOutButton className="navLink" />
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
