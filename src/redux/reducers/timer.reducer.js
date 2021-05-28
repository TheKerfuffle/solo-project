const timer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_TIMER':
            return action.payload;
        case 'RESET_TIMER':
            return 0;
        default:
            return state;
    }
};

export default timer;