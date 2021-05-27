import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* deleteAttempt( action ) {
    try {
        // const puzzles = yield axios.get(`/api/play`);
        console.log('in Delete Attempt, action.payload is:', action.payload);



        // ID IS A PUZZLE ID NOT A USER/PLAYER ID
        // PAYLOAD IS A PUZZLE OBJECT, NOT AN ATTEMPT

        yield axios.delete(`/api/attempt/${action.payload.id}`);
        yield put({ type: 'GET_ATTEMPT', payload: action.payload });
        
    } catch (error) {
        console.log('PUT attempt error', error);
    }
}

export default deleteAttempt;