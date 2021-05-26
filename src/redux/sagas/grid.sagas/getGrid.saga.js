import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getGrid() {
    try {
        const grid = yield axios.get(`/api/grid`);
        console.log('GET GRID/grid length', grid.data, grid.data.length);
        const randomPuzzle = Math.floor(Math.random()*grid.data.length);
        console.log('randomPuzzle,', randomPuzzle);
        
        yield put({ type: 'SET_GRID', payload: grid.data[0] });
        yield put({type: 'SET_H_GRID', payload: grid.data[0]});
        yield put({type: 'SET_V_GRID', payload: grid.data[0]});
    } catch (error) {
        console.log('get items error', error);
    }
}

export default getGrid;