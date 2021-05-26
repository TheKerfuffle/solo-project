const attempt = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ATTEMPT':
            return action.payload;
        case 'UPDATE_ATTEMPT':
            return 
        default: 
            return state;
    }
};

export default attempt;