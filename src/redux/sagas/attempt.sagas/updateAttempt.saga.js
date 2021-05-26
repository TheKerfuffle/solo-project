import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* updateAttempt( action ) {
    try {
        // const puzzles = yield axios.get(`/api/play`);
        console.log('in Update Attempt', action.payload);

        yield axios.put(`/api/attempt`, action.payload);
        yield put({ type: 'GET_ATTEMPT', payload: action.payload });
        
    } catch (error) {
        console.log('PUT attempt error', error);
    }
}

export default updateAttempt;