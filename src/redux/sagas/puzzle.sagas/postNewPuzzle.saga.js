import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* postNewPuzzle(action) {
    try {
        // const puzzles = yield axios.get(`/api/play`);
        console.log('in postNewPuzzle, action.payload', action.payload);

        yield axios.post(`/api/puzzle`, action.payload);
        yield put({
            type: 'SET_NEW_PUZZLE', payload: {
                creator_id: 0,
                title: '',
                solution_data: [],
                height: 0,
                width: 0,
            }
        });


    } catch (error) {
        console.log('POST new puzzle error', error);
    }
}

export default postNewPuzzle;