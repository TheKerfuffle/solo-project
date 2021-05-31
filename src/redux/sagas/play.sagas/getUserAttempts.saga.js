import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getUserAttempts(action) {
    try {
        const allAttempts = yield axios.get(`/api/attempt`);
        // console.log('GET all puzzles/all puzzles length', puzzles.data, puzzles.data.length);
        yield put({ type: 'SET_USER_ATTEMPTS', payload: allAttempts.data });

    } catch (error) {
        console.log('get items error', error);
    }
}

export default getUserAttempts;