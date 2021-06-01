
import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getUserPuzzles() {
    try {
        const allPuzzles = yield axios.get(`/api/puzzle`);
        // console.log('GET all puzzles/all puzzles length', puzzles.data, puzzles.data.length);
        yield put({ type: 'SET_USER_PUZZLES', payload: allPuzzles.data });

    } catch (error) {
        console.log('get items error', error);
    }
}

export default getUserPuzzles;