import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
// import postTimer from './timer.sagas/postTimer.saga';
// import putTimer from './timer.sagas/putTimer.saga';
// import getTimer from './timer.sagas/getTimer.saga';
import getGrid from './grid.sagas/getGrid.saga';
import getRandomPuzzle from './play.sagas/getRandomPuzzle.saga';
import postNewAttempt from './attempt.sagas/postNewAttempt.saga';
import updateAttempt from './attempt.sagas/updateAttempt.saga';
import getAttempt from './attempt.sagas/getAttempt.saga';
import deleteAttempt from './attempt.sagas/deleteAttempt.saga';
import postNewPuzzle from './puzzle.sagas/postNewPuzzle.saga';
import getUserAttempts from './play.sagas/getUserAttempts.saga';
import deleteRawPuzzle from './puzzle.sagas/deleteRawPuzzle.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {

  yield takeEvery('GET_GRID', getGrid);
  yield takeEvery('GET_RANDOM_PUZZLE', getRandomPuzzle);
  yield takeEvery('GET_ATTEMPT', getAttempt)
  yield takeEvery('POST_NEW_ATTEMPT', postNewAttempt);
  yield takeEvery('UPDATE_ATTEMPT', updateAttempt);
  yield takeEvery('DELETE_ATTEMPT', deleteAttempt);
  yield takeEvery('POST_NEW_PUZZLE', postNewPuzzle);
  yield takeEvery('DELETE_RAW_PUZZLE', deleteRawPuzzle);
  yield takeEvery('GET_USER_ATTEMPTS', getUserAttempts);
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
  ]);
}
