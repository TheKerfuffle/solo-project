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

})