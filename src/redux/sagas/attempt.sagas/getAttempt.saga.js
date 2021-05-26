import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getAttempt(action) {
    // ACTION PAYLOAD IS A PUZZLE ID NOT A USER ID
    try {
        const attempt = yield axios.get(`/api/attempt/${action.payload.id}`);
        console.log('try GET attempt.data[0]', attempt.data[0]);
        if (attempt.data[0] === undefined) {
            const newAttempt = generateAttempt(action.payload);
            console.log('attempt is empty, generating new attempt', newAttempt);
            yield put({ type: 'SET_ATTEMPT', payload: newAttempt })
        } else {
            yield put({ type: 'SET_ATTEMPT', payload: attempt.data[0] });
        }
    } catch (error) {
        console.log('GET attempt error', error);
    }
}

export default getAttempt;

function generateAttempt(puzzle) {
    console.log('generating attempt for puzzle:', puzzle);

    let newTry = [];
    let newRow = [];
    let solutionArray = puzzle.solution_data;
    for (let i = 0; i < solutionArray.length; i++) {
        for (let j = 0; j < solutionArray[0].length; j++) {
            newRow = [...newRow, 0]
        }
        newTry.push(newRow);
        newRow = [];
    }

    return {
        id: 0,
        player_id: 0,
        puzzle_id: puzzle.id,
        timer: 0,
        input_data: newTry,
        completed: false
    }
}