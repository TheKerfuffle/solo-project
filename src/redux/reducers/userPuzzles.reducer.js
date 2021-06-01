const userPuzzles = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_PUZZLES':
            return action.payload;
        default: 
            return state;
    }
};

export default userPuzzles;