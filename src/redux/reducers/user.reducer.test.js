import userReducer from './user.reducer';

describe('testing userReducer...', () => {

    test('Initial state should be an empty OBJECT...', () => {
        let action = {};
        let state = undefined;
        let returnedState = userReducer(state, action);

        expect(returnedState).toEqual({});
    })

    test('Test UNSET USER (logout)...', () => {
        let action = {type: 'UNSET_USER'};
        let state = { username: 'jdoe', id: 0 };
        let returnedState = userReducer(state, action);

        expect(returnedState).toEqual({});
    })

    test('Test SET USER (login)...', () => {
        let user = { username: 'jdoe', id: 0 };
        let action = {type: 'SET_USER', payload: user};
        let state = {};
        let returnedState = userReducer(state, action);

        expect(returnedState).toEqual( user );
    })

})