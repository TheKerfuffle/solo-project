const userAttempts = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_ATTEMPTS':
            return action.payload;
        default: 
            return state;
    }
};

export default userAttempts;