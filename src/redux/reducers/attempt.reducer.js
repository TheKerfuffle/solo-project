const attempt = (state = 
    {
        input_data: [],
        player_id: 0,
        puzzle_id: 0,
        completed: false,
        id: 0,
        timer: 0
    }
    , action) => {
    switch (action.type) {
        case 'SET_ATTEMPT':
            return action.payload;
        default: 
            return state;
    }
};

export default attempt;