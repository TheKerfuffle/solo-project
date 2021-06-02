import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getPuzzle(action) {
    // ACTION PAYLOAD SHOULD BE A RAW PUZZLE ID, NUM
    try {
        const puzzle = yield axios.get(`/api/play/${action.payload}`);
        // console.log('GET all puzzles/all puzzles length', puzzles.data, puzzles.data.length);
        console.log('SHOULD BE HERE! getting puzzle data for:', action.payload, puzzle.data[0]);

        yield put({ type: 'RESET_SOLUTION' });
        yield put({ type: 'RESET_ATTEMPT' });
        yield put({ type: 'RESET_V_GRID' });
        yield put({ type: 'RESET_H_GRID' });
        
        yield put({ type: 'SET_SOLUTION', payload: puzzle.data[0] });
        yield put({ type: 'GET_ATTEMPT', payload: puzzle.data[0] });
        yield put({ type: 'SET_H_GRID', payload: puzzle.data[0] });
        yield put({ type: 'SET_V_GRID', payload: puzzle.data[0] });
    } catch (error) {
        console.log('get items error', error);
    }
}

export default getPuzzle;