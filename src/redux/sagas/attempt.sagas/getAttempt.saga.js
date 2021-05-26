import { put } from '@redux-saga/core/effects';
import axios from 'axios';

function* getAttempt(action) {
    // ACTION PAYLOAD IS A PUZZLE OBJECT NOT A USER ID
    try {
        console.log('action.payload.id',action.payload.id);
        let attempt;
        
        // checks if payload is an attempt or a raw puzzle, both are possible
        // If it is an attempt ...
        if (action.payload.id === 0) {
            attempt = yield axios.get(`/api/attempt/${action.payload.puzzle_id}`);
            console.log('try GET attempt.data[0]', attempt.data[0]);
        } 
        // If it is a raw puzzle
        else {
            attempt = yield axios.get(`/api/attempt/${action.payload.id}`);
            console.log('try GET attempt.data[0]', attempt.data[0]);
        }

        // Checks to see if there was an attempt in the database for the associated user/puzzle
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