import { useEffect } from "react";
import { useState } from "react";


function Minesweeper() {

    const [minesBoard, setMinesBoard] = useState([])

    const [underlay, setUnderlay] = useState([]);
    const [reveal, setReveal] = useState([]);
    const [revealedCells, setRevealedCells] = useState([]);

    useEffect(() => {
        generateMinesweeper(8, 10, 10);
    }, [])

    useEffect(() => {
        console.log('Reveal has been updated!', reveal);
        checkComplete()
    }, [reveal])

    function checkComplete() {

    }


    // ________________________________________Generate Puzzle Function________________________________________
    function generateMinesweeper(difficulty, width, height) {
        console.log('difficulty', difficulty);
        console.log('width, height', width, height);

        // For now generate a 10x10 grid with 8 difficulty (8 bombs)
        // width = 10;
        // height = 10;
        // difficulty = 8;

        // Makes the empty grid of the requisite size
        let newGrid = [];

        for (let i = 0; i < height; i++) {

            let newRow = [];

            for (let j = 0; j < width; j++) {

                newRow.push(0);

            }

            newGrid.push(newRow);
        }
        // Log Empty Grid
        console.log('newGrid without bombs', newGrid);

        // Add Bombs to unique locations
        while (difficulty > 0) {
            let xPos = Math.floor(Math.random() * width);
            let yPos = Math.floor(Math.random() * height);

            if (newGrid[yPos][xPos] === 0) {
                newGrid[yPos][xPos] = 1;
                difficulty--;
            }
        }

        // Log Grid with bombs
        console.log('newGrid with bombs', newGrid);



        // Initialize variables to create the game Underlay
        let newUnderlay = [];
        let newReveal = [];



        // Go through the generated grid and calculate the value of each square from 1-8

        for (let y = 0; y < newGrid.length; y++) {
            let underlayRow = [];
            let newRevealRow = [];
            for (let x = 0; x < newGrid[y].length; x++) {
                let clueValue = 0;
                // if the current block is a bomb, don't do anything with it
                if (newGrid[y][x] === 1) {
                    console.log('Bomb, y, x', y, x);
                    underlayRow.push('&');
                    newRevealRow.push(0);
                } else {
                    // Since we know this space does not hold a bomb...
                    // We want to check all of the blocks around the current block
                    // and add up all of the bombs this will determine its behavior

                    // If y=0, no y-1
                    // If y=newGrid.length, no y+1
                    // If x=0, no x-1
                    // or x=newGrid[y].length, no x+1

                    // First we check for corners
                    if (y === 0 && x === 0) {
                        console.log('Top Left Corner, y, x', y, x);
                        // x+1
                        if (newGrid[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x+1, y+1
                        if (newGrid[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y+1
                        if (newGrid[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    } else if (y === 0 && x === newGrid[0].length) {
                        console.log('Top Right Corner, y, x', y, x);
                        // x-1
                        if (newGrid[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x-1, y+1
                        if (newGrid[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y+1
                        if (newGrid[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    } else if (y === newGrid.length - 1 && x === 0) {
                        console.log('Bottom Left Corner, y, x', y, x);
                        // x+1
                        if (newGrid[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x+1, y-1
                        if (newGrid[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y-1
                        if (newGrid[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    } else if (y === newGrid.length - 1 && x === newGrid[newGrid.length - 1].length - 1) {
                        console.log('Bottom Right Corner, y, x', y, x);
                        // x-1
                        if (newGrid[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x-1, y-1
                        if (newGrid[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y-1
                        if (newGrid[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    }

                    // Next we check for edges
                    // y=0
                    else if (y === 0) {
                        console.log('Top Edge, y, x', y, x);
                        // no y-1
                        if (newGrid[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                    }

                    // x=0
                    else if (x === 0) {
                        console.log('Left Edge, y, x', y, x);
                        // no x-1
                        if (newGrid[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                    }

                    // y=newGrid.length
                    else if (y === newGrid.length - 1) {
                        console.log('Bottom Edge, y, x', y, x);
                        // no y+1
                        if (newGrid[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    }
                    // x=newGrid[y].length
                    else if (x === newGrid[y].length - 1) {
                        console.log('Right Edge, y, x', y, x);
                        // no x+1
                        if (newGrid[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (newGrid[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    }
                    // Otherwise we check everything
                    else {
                        console.log('Normal Square, y, x', y, x);

                        // Check Up             [y-1]   [x]
                        if (newGrid[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Up Right       [y-1]   [x+1]
                        if (newGrid[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Right          [y]     [x+1]
                        if (newGrid[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Down Right     [y+1]   [x+1]
                        if (newGrid[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Down           [y+1]   [x]
                        if (newGrid[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Down Left      [y+1]   [x-1]
                        if (newGrid[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Left           [y]     [x-1]
                        if (newGrid[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Up Left        [y-1]   [x-1]
                        if (newGrid[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                    }
                    console.log('finished clue, y, x', y, x);
                    underlayRow.push(clueValue);
                    newRevealRow.push(0);
                }
            }
            console.log('Finished underlay Row', underlayRow);
            newUnderlay.push(underlayRow);

            console.log('finished reveal row', newRevealRow);
            newReveal.push(newRevealRow);

            console.log('pushed to newReveal, reveal:', newReveal);
        }
        console.log('Finished underlay', newUnderlay);
        setUnderlay(newUnderlay);
        setReveal(newReveal);
    }

    // ____________________Breadth First Search____________________
    function revealCell(enqueue, dequeue, changeReveal) {
        // enqueue and dequeue are arrays,
        // enqueue holds all things to be checked, begins with cell that was clicked
        // dequeue holds all things previously checked, begins as an empty array

        console.log('Beginning revealCell');
        console.log('enqueue', enqueue);
        console.log('dequeue', dequeue);

        // IF DEQUEUE IS EMPTY, THIS IS THE FIRST PASS OF THE FUNCTION
        // SO, WE INITIALIZE A REVEAL MIRROR
        if (dequeue.length === 0) {
            changeReveal = JSON.parse(JSON.stringify(reveal))
        }

        // We begin by grabbing the first value in enqueue
        // The values in enqueue are always in the format [y,x]
        let elementToCheck = enqueue.shift();

        // Add the current values to the dequeue array
        dequeue.push(elementToCheck);
        let y = elementToCheck[0];
        let x = elementToCheck[1];

        console.log('elementToCheck, y, x', elementToCheck, y, x);

        // We must go through and check all 8 directions for each square 
        // and we only check them if they have not previously been checked

        // If the revealed cell is a bomb, we crash out - GOOD
        if (underlay[y][x] === '&') {
            let newReveal = [];
            // Reveal all cells in the game board
            for (let row of underlay) {
                let newRow = [];
                for (let cell of row) {
                    newRow.push(1);
                }
                newReveal.push(newRow)
            }
            setReveal(newReveal);
            alert('YOU FUCKIN LOSE');
        }

        // If the revealed cell is 0, we begin a flood fill algorithm
        else {

            // Add things to enqueue array if the value is 0
            if (underlay[y][x] === 0) {
                // BEGIN BY ADDING ALL 8 DIRECTIONS TO THE ENQUEUE ARRAY, 
                // WE ONLY ADD TO ENQUEUE IF THE VALUE HAS NOT ALREADY BEEN ADDED TO ENQUEUE OR IS IN DEQUEUE

                // UP - NO Y=0
                if (y > 0) {
                    let checkUp = true;
                    for (let cell of enqueue) {
                        if (y - 1 === cell[0] && x === cell[1]) {
                            checkUp = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y - 1 === cell[0] && x === cell[1]) {
                            checkUp = false;
                        }
                    }
                    if (checkUp) {
                        enqueue.push([y - 1, x])
                    }
                }

                // UP RIGHT - NO Y=0 OR X=UNDERLAY[0].LENGTH-1

                if (y > 0 && x < underlay[0].length - 1) {
                    let checkUpRight = true;
                    for (let cell of enqueue) {
                        if (y - 1 === cell[0] && x + 1 === cell[1]) {
                            checkUpRight = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y - 1 === cell[0] && x + 1 === cell[1]) {
                            checkUpRight = false;
                        }
                    }
                    if (checkUpRight) {
                        enqueue.push([y - 1, x + 1])
                    }
                }

                // RIGHT - NO X=UNDERLAY[0].LENGTH-1

                if (x < underlay[0].length - 1) {
                    let checkRight = true;
                    for (let cell of enqueue) {
                        if (y === cell[0] && x + 1 === cell[1]) {
                            checkRight = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y === cell[0] && x + 1 === cell[1]) {
                            checkRight = false;
                        }
                    }
                    if (checkRight) {
                        enqueue.push([y, x + 1])
                    }
                }

                // DOWN RIGHT - NO Y=UNDERLAY.LENGTH-1 OR X=UNDERLAY[0].LENGTH-1

                if (y < underlay.length - 1 && x < underlay[0].length - 1) {
                    let checkDownRight = true;
                    for (let cell of enqueue) {
                        if (y + 1 === cell[0] && x + 1 === cell[1]) {
                            checkDownRight = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y + 1 === cell[0] && x + 1 === cell[1]) {
                            checkDownRight = false;
                        }
                    }
                    if (checkDownRight) {
                        enqueue.push([y + 1, x + 1])
                    }
                }

                // DOWN - NO Y=UNDERLAY.LENGTH-1

                if (y < underlay.length - 1) {
                    let checkDown = true;
                    for (let cell of enqueue) {
                        if (y + 1 === cell[0] && x === cell[1]) {
                            checkDown = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y + 1 === cell[0] && x === cell[1]) {
                            checkDown = false;
                        }
                    }
                    if (checkDown) {
                        enqueue.push([y + 1, x])
                    }
                }

                // DOWN LEFT - NO Y=UNDERLAY.LENGTH-1 OR X=0

                if (y < underlay.length - 1 && x > 0) {
                    let checkDownLeft = true;
                    for (let cell of enqueue) {
                        if (y + 1 === cell[0] && x - 1 === cell[1]) {
                            checkDownLeft = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y + 1 === cell[0] && x - 1 === cell[1]) {
                            checkDownLeft = false;
                        }
                    }
                    if (checkDownLeft) {
                        enqueue.push([y + 1, x - 1])
                    }
                }

                // LEFT - NO X=0

                if (x > 0) {
                    let checkLeft = true;
                    for (let cell of enqueue) {
                        if (y === cell[0] && x - 1 === cell[1]) {
                            checkLeft = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y === cell[0] && x - 1 === cell[1]) {
                            checkLeft = false;
                        }
                    }
                    if (checkLeft) {
                        enqueue.push([y, x - 1])
                    }
                }

                // LEFT UP - NO Y=0 OR X=0

                if (x > 0 && y > 0) {
                    let checkUpLeft = true;
                    for (let cell of enqueue) {
                        if (y - 1 === cell[0] && x - 1 === cell[1]) {
                            checkUpLeft = false;
                        }
                    }
                    for (let cell of dequeue) {
                        if (y - 1 === cell[0] && x - 1 === cell[1]) {
                            checkUpLeft = false;
                        }
                    }
                    if (checkUpLeft) {
                        enqueue.push([y - 1, x - 1])
                    }
                }
            }

            // Set the clicked element's reveal variable
            // to 1 which will trigger the element to display
            changeReveal[y][x] = 1;
        }

        console.log('enqueue after pushes', enqueue);

        if (enqueue.length > 0) {
            revealCell(enqueue, dequeue, changeReveal);
        } else {
            setReveal(changeReveal);
        }


    }

    function flagCell(e, y, x) {
        e.preventDefault();
        let changeReveal = JSON.parse(JSON.stringify(reveal));

        if (changeReveal[y][x] === 2) {
            changeReveal[y][x] = 0;
        } else {
            changeReveal[y][x] = 2;
        }

        setReveal(changeReveal);
    }

    return (
        <>
            <p>Underlay: {JSON.stringify(underlay)}</p>
            <p>Reveal: {JSON.stringify(reveal)}</p>
            <p>Revealed Cells: {JSON.stringify(revealedCells)}</p>

            <table>
                <tbody>
                    {underlay && underlay.map((row, y) =>

                        <tr key={y + 'elementRow'}>


                            {
                                row.map((element, x) =>
                                    <td key={y + 'element' + x} onContextMenu={(event) => flagCell(event, y, x)} onClick={() => revealCell([[y, x]], [])}>
                                        {reveal[y][x] === 0 ? ('') : (reveal[y][x] === 1 ? (element) : ('F'))}
                                    </td>
                                )
                            }
                        </tr>



                    )}
                </tbody>
            </table>



        </>
    )
}

export default Minesweeper;