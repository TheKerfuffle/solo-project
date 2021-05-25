const hGrid = (state = {}, action) => {
    switch (action.type) {
        case 'SET_H_GRID':
            return generateHorizontal(action.payload);
        default:
            return state;
    }
};

export default hGrid;

function generateHorizontal(gridData) {
    let gridArray = gridData.tabledata;
    let hData = [];
    let newRow = [];
    let newClue = 0;
    let maxRowLength = 0;
    // console.log(gridArray, 'IN GENERATE HORIZONTAL');

    // Loop through i which denotes which row we are working with
    for (let i = 0; i < gridArray.length; i++) {


        // Loop through j which denotes which element of the row we are working with
        for (let j = 0; j < gridArray[i].length; j++) {
            // console.log(i, j);


            if (gridArray[i][j] === 1) {
                newClue++;
            } else if (gridArray[i][j] === 0 && newClue > 0) {
                newRow.push(newClue);
                // console.log('pushed:', newClue);

                newClue = 0;
            }
        }
        if (newClue > 0) {
            newRow.push(newClue);
            // console.log('pushing last item of row', newClue);
            newClue = 0;
        }

        if (newRow.length > maxRowLength) {
            maxRowLength = newRow.length;
        }
        hData.push(newRow);
        newRow = [];
    }
    console.log('maxRowLength', maxRowLength);

    // return hData;
    return processResult(hData, maxRowLength);
}

function processResult(data, length) {
    let newData = [];
    let newRow= [];
    console.log('data:', data);
    

    for (let array of data) {
        console.log('array:', array);
        
        newRow = processRow(array, length);
        console.log('newRow', newRow);
        
        newData.push(newRow);
        newRow = [];

        
    }
    return newData;
}


function processRow(row, length) {
    let newRow = row;
    console.log(newRow.length, length);
    
    if (newRow.length < length) {
        newRow.unshift(0);
        return processRow(newRow, length)
    }
    else {
        return newRow;
    }
}


