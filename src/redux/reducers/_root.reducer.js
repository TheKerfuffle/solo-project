import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import timer from './timer.reducer';
import grid from './grid.reducer';
import hGrid from './hGrid.reducer';
import vGrid from './vGrid.reducer';
import attempt from './attempt.reducer';
import solution from './solution.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  solution,
  attempt,
  grid,
  hGrid,
  vGrid,
  timer,    // contains local timer data
  errors,   // contains registrationMessage and loginMessage
  user,     // will have an id and username if someone is logged in
});

export default rootReducer;
