import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* putTimer(action) {
    try {
        const timer = yield axios.put('/timer', action.payload);
        console.log('put', timer.data);
        yield put({ type: 'SET_TIMER', payload: timer.data });
    } catch (error) {
        console.log('Error in POST timer', error);
    }
}

export default putTimer;