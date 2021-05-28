const newPuzzle = (state =
    {
        creator_id: 0,
        title: '',
        solution_data: [],
        height: 0,
        width: 0
    }
    , action) => {
    switch (action.type) {
        case 'MAKE_NEW_PUZZLE':
            return generateNewGrid(action.payload);
        case 'SET_NEW_PUZZLE':
            return action.payload;
        default:
            return state;
    }
};

export default newPuzzle;

function generateNewGrid(newGrid) {
    let value = 0;
    let width = newGrid.width;
    let height = newGrid.height;
    let grid = [];
    let row = [];
    for (let l = 0; l < height; l++) {
        for (let k = 0; k < width; k++) {
            row.push(value);
        }
        grid.push(row);
        row=[];
    }

    console.log('new grid in newPuzzle reducer', grid);

    return {
        creator_id: newGrid.creator_id,
        title: newGrid.title,
        solution_data: grid,
        height: height,
        width: width
    };

}