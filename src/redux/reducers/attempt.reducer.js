const attempt = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ATTEMPT':
            return action.payload;
        default: 
            return state;
    }
};

export default attempt;