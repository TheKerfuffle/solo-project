import { put } from '@redux-saga/core/effects';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



function* getRandomPuzzle() {
    try {
        const puzzleID = yield axios.get(`/api/play`);

        console.log('in getRandomPuzzle, random puzzle ID', puzzleID.data.id);

        // yield put ({ type: 'RESET_SOLUTION'});

        yield put({ type: 'SET_RANDOM_ID', payload: puzzleID.data.id});

        // yield put(push(`/play/${puzzleID.data.id}`))

        // yield put({ type: 'GET_PUZZLE', payload: puzzleID.data.id});

    } catch (error) {
        console.log('get items error', error);
    }
}

export default getRandomPuzzle;

