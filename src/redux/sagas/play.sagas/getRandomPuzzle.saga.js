import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getRandomPuzzle() {
    try {
        const puzzles = yield axios.get(`/api/play`);
        // console.log('GET all puzzles/all puzzles length', puzzles.data, puzzles.data.length);
        const randomPuzzle = Math.floor(Math.random() * puzzles.data.length);
        

        yield put({ type: 'SET_SOLUTION', payload: puzzles.data[randomPuzzle] });
        yield put({ type: 'GET_ATTEMPT', payload: puzzles.data[randomPuzzle] });
        yield put({ type: 'SET_H_GRID', payload: puzzles.data[randomPuzzle] });
        yield put({ type: 'SET_V_GRID', payload: puzzles.data[randomPuzzle] });
    } catch (error) {
        console.log('get items error', error);
    }
}

export default getRandomPuzzle;