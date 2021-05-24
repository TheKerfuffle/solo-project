import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getTimer() {
    try {
        const timer = yield axios.get(`/timer`);
        console.log('get all', timer.data);
        yield put({ type: 'SET_TIMER', payload: timer.data });
    } catch (error) {
        console.log('get items error', error);
    }
}

export default getTimer;