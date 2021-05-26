import { put } from '@redux-saga/core/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';

function* getRandomPuzzle() {
    try {
        const puzzles = yield axios.get(`/api/play`);
        console.log('GET GRID/grid length', puzzles.data, puzzles.data.length);
        const randomPuzzle = Math.floor(Math.random() * puzzles.data.length);
        const newAttempt = generateAttempt(puzzles.data[randomPuzzle]);
        yield put({ type: 'SET_SOLUTION', payload: puzzles.data[randomPuzzle] });
        yield put({ type: 'SET_ATTEMPT', payload: newAttempt });
        yield put({ type: 'SET_H_GRID', payload: puzzles.data[randomPuzzle] });
        yield put({ type: 'SET_V_GRID', payload: puzzles.data[randomPuzzle] });
    } catch (error) {
        console.log('get items error', error);
    }
}

export default getRandomPuzzle;

function generateAttempt(puzzle) {
    let newTry = [];
    let newRow = [];
    let solutionArray = puzzle.solution_data;
    for (let i = 0; i < solutionArray.length; i++) {
        for (let j = 0; j < solutionArray[0].length; j++) {
            newRow = [...newRow,0]
        }
        newTry.push(newRow);
        newRow = [];
    }

    return {
        player_id: 0,
        puzzle_id: puzzle.id,
        timer: 0,
        input_data: newTry,
        completed: false
    }
}