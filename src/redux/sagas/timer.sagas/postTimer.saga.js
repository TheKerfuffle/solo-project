import axios from 'axios';

function* postTimer(action) {
    try {
        yield axios.post('/timer', action.payload);
    } catch (error) {
        console.log('Error in POST timer', error);
    }
}

export default postTimer;