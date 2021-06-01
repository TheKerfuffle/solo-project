import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* deleteRawPuzzle(action) {
    try {
        console.log('ACTIONPAYLOAD IN deleteRawPuzzle', action.payload);

        // DELETES ALL ATTEMPTS FOR RAW PUZZLE FIRST.
        yield axios.delete(`/api/play/${action.payload.id}`)
        // DELETES THE RAW PUZZLE.
        yield axios.delete(`/api/puzzle/${action.payload.id}`);

        yield put({type: 'GET_USER_ATTEMPTS'});
        yield put({type: 'GET_USER_PUZZLES'});



    } catch (error) {
        console.log('get items error', error);
    }
}

export default deleteRawPuzzle;