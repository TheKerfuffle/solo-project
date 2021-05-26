import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* postNewAttempt( action ) {
    try {
        // const puzzles = yield axios.get(`/api/play`);
        console.log('in postNewAttempt, payload, puzzle_id', action.payload, action.payload.puzzle_id);

        yield axios.post(`/api/attempt`, action.payload);

    } catch (error) {
        console.log('POST new attempt error', error);
    }
}

export default postNewAttempt;