const vGrid = (state = {
    length: 0,
    tableData: [],
    fillerGrid: []
}, action) => {
    switch (action.type) {
        case 'SET_V_GRID':
            return generateVertical(action.payload);
        case 'RESET_V_GRID':
            return {
                length: 0,
                tableData: [],
                fillerGrid: []
            };
        default:
            return state;
    }
};

export default vGrid;

// This block of code contains the most hard fought element of this project.
// I am extremely proud of this code
// I tried writing it for of loops, but we need to target specific indices
// within the solution data to reorder and process the clues we need
function generateVertical(gridData) {

    let gridArray = gridData.solution_data;
    let rotateData = [];
    let newRow = [];

    // Effectively rotates the data 90 degrees CounterClockwise, 
    // stores that new nested array in rotateData
    for (let j = gridArray[0].length - 1; j >= 0; j--) {
        for (let i = 0; i < gridArray.length; i++) {
            newRow.push(gridArray[i][j]);
        }
        rotateData.push(newRow);
        newRow = [];
    }

    // Generate Horizontal and associated functions process the 
    // now rotated data (which now resembles the data as the hGrid reducer sees it)
    // and generates clues that will be able to be taken and displayed on the DOM above the play grid
    return generateHorizontal(rotateData);
}


// Since the vertical columns have been rotated 90degrees counterclockwise,
// we can treat the data as though it were "horizontal", 
// then rotate the resultant data 90 degrees clockwise back to normal
function generateHorizontal(gridData) {

    // Initialize varaibles for use in this function:
    // hData: The unprocessed clues for the 
             // horizontal version of the vertical puzzle
    let hData = [];
    let gridArray = gridData;
    let newRow = [];

    // ************************************************************************
    // USERS REQUIRE CLUES IN ORDER TO PLAY, A CLUE WILL DENOTE ADJACENT
    // VALUES OF 1, IF A 0 COMES BETWEEN THESE 1 VALES, THAT WILL END THE 
    // CURRENT CLUE. THIS IS REQUIRED FOR ALL ROWS AND COLUMNS, HENCE THIS.
    // ************************************************************************
    let newClue = 0;
    let maxRowLength = 0;

    // Loop through i which denotes the row we are working with
    for (let i = 0; i < gridArray.length; i++) {
        // Loop through j which denotes the element of the row we are working with
        for (let j = 0; j < gridArray[i].length; j++) {
            // if this element is 1 that means it represents 
            // a filled in box, thus increments the clue
            if (gridArray[i][j] === 1) {
                newClue++;
            } 
            // if this element is 0 and we have incremented clue (even once)
            // we add the current clue and reset it to 0
            else if (gridArray[i][j] === 0 && newClue > 0) {
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
        // We ALSO need to know the longest row of clues so that all 
        // can be made this long, This is for display purposes and 
        // occurs in processResult below
        if (newRow.length > maxRowLength) {
            maxRowLength = newRow.length;
        }
        // push the new clues in the row and reset the row
        hData.push(newRow);
        newRow = [];
    }

    // Here we process the results (make sure each clue row is the same length)
    // Then we rerotate (clockwise) the processed arrays in order 
    // to be mounted ABOVE the grid, thus matching the solution data
    let finishedData = rotateArray(processResult(hData, maxRowLength), maxRowLength);

    // Bundle up data for use in PlayPuzzle component
    const vGridData = {
        length: maxRowLength,
        tableData: finishedData,
        fillerGrid: generateFiller(maxRowLength)
    }
    return vGridData;
}


// calls process row, which adds zeros before the non zero values 
// of each row until all rows are the same length
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

// Uses recursion to unshift zeros into the clue row, because recursion is cool
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

// Rotates the array clockwise in order to be mounted on the top of the play grid
function rotateArray(array, length) {
    let rotatedArray = [];
    let newRow = [];
    for (let i = 0; i < length; i++) {
        for (let j = array.length - 1; j >= 0; j--) {
            newRow.push(array[j][i]);
        }
        rotatedArray.push(newRow);
        newRow = [];
    }
    return rotatedArray;
}

// Generates a filler grid in order to fill in the top left corner of the play grid
// Gets used with the hGrid in order to do this
function generateFiller(length) {
    let filler = [];
    for (let i = 0; i < length; i++) {
        filler.push(0);
    }
    return filler;
}