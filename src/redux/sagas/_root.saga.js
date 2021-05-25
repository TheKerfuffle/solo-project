import { all, takeEvery } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
// import postTimer from './timer.sagas/postTimer.saga';
// import putTimer from './timer.sagas/putTimer.saga';
// import getTimer from './timer.sagas/getTimer.saga';
import getGrid from './grid.sagas/getGrid.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  // yield takeEvery('POST_TIMER', postTimer);
  // yield takeEvery('PUT_TIMER', putTimer);
  // yield takeEvery('GET_TIMER', getTimer);
  yield takeEvery('GET_GRID', getGrid);
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
  ]);
}
