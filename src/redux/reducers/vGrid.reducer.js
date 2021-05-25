const vGrid = (state = {}, action) => {
    switch (action.type) {
        case 'SET_V_GRID':
            return generateVertical(action.payload);
        default:
            return state;
    }
};

export default vGrid;

// This block of code contains the most hard fought element of this project.
// I am extremely proud of this code
function generateVertical(gridData) {

    let gridArray = gridData.tabledata;
    let puzzleSize = gridArray.length; // 10
    let vData = []; // thing to return
    let rotateData = [];
    let newRow = [];
    let newClue = 0;
    let maxRowLength = 0;

    for (let i = 0; i < puzzleSize; i++) {

        for (let j = 0; j < puzzleSize; j++) {
            // console.log('rotate order', gridArray[j][i]);
            newRow.push(gridArray[j][i]);
        }
        rotateData.push(newRow);
        newRow = [];

    }

    return generateHorizontal(rotateData);
}


// Since the vertical columns have been rotated 90degrees counterclockwise,
// we can treat the data as though it were horizontal, 
// then rotate the resultant data 90 degrees clockwise back to normal
function generateHorizontal(gridData) {

    // Initialize varaibles for use in this part of the project
    let gridArray = gridData;
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

    let finishedData = reverseArrays(rotateArray(processResult(hData, maxRowLength), maxRowLength));
    console.log('finishedData', finishedData);


    const vGridData = {
        length: maxRowLength,
        tableData: finishedData
    }
    return vGridData;
}



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

function rotateArray(array, length) {
    console.log('array/ length', array, length);

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

function reverseArrays(array) {
    let reversedAr = [];
    let newRow = [];
    for (let nestedArray of array) {
        for (let i = nestedArray.length - 1; i < nestedArray.length; i--) {
            newRow.push(nestedArray[i]);
        }
        reversedAr.push(newRow);
        newRow = [];
    }
    return reversedAr;
}