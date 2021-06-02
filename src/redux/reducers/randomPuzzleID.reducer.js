const randomPuzzleID = (state = 0, action) => {
    switch (action.type) {
        case 'SET_RANDOM_ID':
            return action.payload;
        case 'RESET_RANDOM_ID':
            return 0;
        default:
            return state;
    }
};

export default randomPuzzleID;