const hGrid = (state = {
    length: 0,
    tableData: [],
    fillerGrid: []
}, action) => {
    switch (action.type) {
        case 'SET_H_GRID':
            return generateHorizontal(action.payload);
        case 'RESET_H_GRID':
            return {
                length: 0,
                tableData: [],
                fillerGrid: []
            };
        default:
            return state;
    }
};

export default hGrid;

// This block of code contains the most hard fought element of this project.
// I am extremely proud of this code

// ******************************************************************************************
// FOR ANOTHER AND SLIGHTLY MORE IN DEPTH LOOK AT THIS CODE, see the vGrid reducer
// That component has more steps and does the same thing while rotating the data back and forth
// ******************************************************************************************
function generateHorizontal(gridData) {

    // Initialize varaibles for use in this part of the project
    let gridArray = gridData.solution_data;
    let hData = [];
    let newRow = [];
    let newClue = 0;
    let maxRowLength = 0;

    // Loop through i which denotes the row we are working with
    for (let i = 0; i < gridArray.length; i++) {

        // Loop through j which denotes the element of the row we are working with
        for (let j = 0; j < gridArray[i].length; j++) {
            if (gridArray[i][j] === 1) {
                newClue++;
            } else if (gridArray[i][j] === 0 && newClue > 0) {
                newRow.push(newClue);
                newClue = 0;
            }
        }

        // If the last element of the grid contains a clue, this if statement grabs it
        // Then it resets the current clue for use with the next row
        if (newClue > 0) {
            newRow.push(newClue);
            newClue = 0;
        }
        // We need to know the longest row of clues so that all can be made this long
        if (newRow.length > maxRowLength) {
            maxRowLength = newRow.length;
        }
        hData.push(newRow);
        newRow = [];
    }

    const hGridData = {
        length: maxRowLength,
        tableData: processResult(hData, maxRowLength),
        fillerGrid: generateFiller(maxRowLength)
    }
    return hGridData;
}

// Fills each row with zeros before the clues until they all are the same length
function processResult(data, length) {
    let newData = [];
    let newRow = [];

    for (let array of data) {
        newRow = processRow(array, length);
        newData.push(newRow);
        newRow = [];
    }
    return newData;
}

// Uses recursion to fill in the given row up to the max length
function processRow(row, length) {
    let newRow = row;

    if (newRow.length < length) {
        newRow.unshift(0);
        return processRow(newRow, length)
    }
    else {
        return newRow;
    }
}

// Filler grid for use on the PlayPuzzle page, top left of the grid
function generateFiller(length) {
    let filler = [];
    for (let i = 0; i < length; i++) {
        filler.push(0);
    }
    return filler;
}