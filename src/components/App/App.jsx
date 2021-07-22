import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import InfoPage from '../InfoPage/InfoPage';
import UserPage from '../UserPage/UserPage';
import HowPage from '../HowPage/HowPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import Grid from '../Grid/Grid';
import PlayPuzzle from '../PlayPuzzle/PlayPuzzle';
import AddPuzzle from '../AddPuzzle/AddPuzzle';
import './App.css';
import Profile from '../Profile/Profile';

import Minesweeper2 from '../Minesweeper/Minesweeper2';
import Minesweeper from '../Minesweeper/Minesweeper';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'],
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>

      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/info"
            >
              <InfoPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
          Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/how"
            >
              <HowPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows Grid else shows LoginPage
              exact
              path="/grid"
            >
              <Grid />
            </ProtectedRoute>
            {/* Play Minesweeper */}

            <ProtectedRoute
              // logged in shows PlayPuzzle else shows LoginPage
              exact
              path="/mine"
            >
              <Minesweeper />
            </ProtectedRoute>
            
            <ProtectedRoute
              // logged in shows PlayPuzzle else shows LoginPage
              exact
              path="/mine/:id"
            >
              <Minesweeper />
            </ProtectedRoute>

            {/* Play Nonograms */}
            <ProtectedRoute
              // logged in shows Getting Puzzle Page else shows LoginPage
              exact
              path="/play"
            >
              <PlayPuzzle />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows PlayPuzzle else shows LoginPage
              path="/play/:id"
            >
              <PlayPuzzle />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows PlayPuzzle else shows LoginPage
              exact
              path="/add"
            >
              <AddPuzzle />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows PlayPuzzle else shows LoginPage
              exact
              path="/profile"
            >
              <Profile />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
          be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
