const solution = (state = [], action) => {
    switch (action.type) {
        case 'SET_SOLUTION':
            return action.payload;
        default: 
            return state;
    }
};

export default solution;