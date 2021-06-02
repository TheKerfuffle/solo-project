import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getRandomPuzzle() {
    try {
        const puzzleID = yield axios.get(`/api/play`);

        // console.log('random puzzle ID', puzzleID.data.id);
        
        yield put({ type: 'GET_PUZZLE', payload: puzzleID.data.id});

    } catch (error) {
        console.log('get items error', error);
    }
}

export default getRandomPuzzle;