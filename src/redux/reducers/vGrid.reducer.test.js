import vGrid from './vGrid.reducer';

// Test function used to test out the vGrid (and hGrid) reducers as I built the app
// As you can see from looking at the vGrid and hGrid reducer, there is a significant
// amount of logic for processing the arrays in these reducers

describe('testing vGrid reducer', () => {

    test('Initial state should be the default OBJECT...', () => {
        let defaultState = {
            length: 0,
            tableData: [],
            fillerGrid: []
        };
        let action = {};
        let state = undefined;
        let returnedState = vGrid(state, action);

        expect(returnedState).toEqual(defaultState);
    })

    test('When reducer is passed solution data, generate correct vGrid data', () => {
        let endState = {
            length: 2,
            tableData: [[0, 0, 1, 0], [2, 2, 1, 2]],
            fillerGrid: [0, 0]
        };
        let action = {
            type: 'SET_V_GRID',
            payload: {
                creator_id: 6,
                id: 20,
                title: 'Nice Puzzle',
                solution_data: [[0, 1, 1, 0],
                [0, 1, 0, 1],
                [1, 0, 1, 1],
                [1, 0, 0, 0]]
            }
        };
        let state = {
            length: 0,
            tableData: [],
            fillerGrid: []
        };
        let returnedState = vGrid(state, action);

        expect(returnedState).toEqual(endState);
    })

    test('When reducer has generated vGrid data, reset to default state', () => {
        let currentState = {
            length: 2,
            tableData: [[0, 0, 1, 0], [2, 2, 1, 2]],
            fillerGrid: [0, 0]
        };
        let action = {
            type: 'RESET_V_GRID',
        };
        let defaultState = {
            length: 0,
            tableData: [],
            fillerGrid: []
        };
        let returnedState = vGrid(currentState, action);

        expect(returnedState).toEqual(defaultState);
    })



})