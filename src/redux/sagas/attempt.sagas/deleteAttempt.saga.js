import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* deleteAttempt( action ) {
    try {
        // const puzzles = yield axios.get(`/api/play`);
        console.log('in Delete Attempt', action.payload);

        yield axios.delete(`/api/attempt`, action.payload);
        yield put({ type: 'GET_ATTEMPT', payload: action.payload });
        
    } catch (error) {
        console.log('PUT attempt error', error);
    }
}

export default deleteAttempt;