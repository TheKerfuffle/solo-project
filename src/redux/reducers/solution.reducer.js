const solution = (state = [], action) => {
    switch (action.type) {
        case 'SET_SOLUTION':
            return action.payload;
        case 'RESET_SOLUTION':
            return [];
        default:
            return state;
    }
};

export default solution;