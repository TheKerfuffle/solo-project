import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* deleteRawPuzzle(action) {
    try {
        console.log('ACTIONPAYLOAD IN deleteRawPuzzle', action.payload);
        
        // yield axios.delete(`/api/puzzle/${action.payload.id}`);



    } catch (error) {
        console.log('get items error', error);
    }
}

export default deleteRawPuzzle;