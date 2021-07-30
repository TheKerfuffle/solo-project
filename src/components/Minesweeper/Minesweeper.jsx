import { useEffect } from "react";
import { useState } from "react";

import FlagIcon from '@material-ui/icons/Flag';

import './Minesweeper.css';

import { Tooltip, Grid, TextField, Button } from "@material-ui/core";


function Minesweeper() {

    // Minesweeper Game Board Data
    const [underlay, setUnderlay] = useState([]);
    const [reveal, setReveal] = useState([]);
    const [completeness, setCompleteness] = useState(false);
    const [finishMessage, setFinishMessage] = useState("No Message");

    // Minesweeper Grid Size/Difficulty Parameters
    const [difficulty, setDifficulty] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        generateMinesweeper(8, 10, 10, true);
    }, [])

    useEffect(() => {
        if (!completeness) {
            console.log('Reveal has been updated!', reveal);
            checkComplete()
        }
    }, [reveal])

    function checkComplete() {
        if (!completeness) {

            let minesUnflagged = 0;
            let bombs = 0;

            console.log('Checking Completeness');

            // Check that all cells have been flagged
            for (let y = 0; y < underlay.length; y++) {
                for (let x = 0; x < underlay[0].length; x++) {
                    if (underlay[y][x] === '&') {
                        bombs++;
                        if (reveal[y][x] !== 2) {
                            minesUnflagged++;
                        }
                    }
                }
            }
            console.log('bombs, minesUnflagged', bombs, minesUnflagged);
            // Only triggers when game is successfully completed
            if (bombs > 0 && minesUnflagged === 0) {
                alert('Minesweeper Complete');
                revealAll();
                setCompleteness(true);
            }
        }
    }


    // ________________________________________Generate Puzzle Function________________________________________
    function generateMinesweeper(difficulty, width, height, autogenerate = false) {
        // console.log('difficulty', difficulty);
        // console.log('width, height', width, height);

        // For now generate a 10x10 grid with 8 difficulty (8 bombs)
        // width = 10;
        // height = 10;
        // difficulty = 8;

        if (autogenerate) {
            setDifficulty(difficulty);
            setWidth(width);
            setHeight(height);
        }

        // When you generate a new game, reset completeness and the alert message 
        setFinishMessage("No Message");
        setCompleteness(false);

        // Makes the empty grid of the requisite size
        let newGrid = [];
        let mines = difficulty;

        for (let i = 0; i < height; i++) {

            let newRow = [];

            for (let j = 0; j < width; j++) {

                newRow.push(0);

            }

            newGrid.push(newRow);
        }
        // Log Empty Grid
        // console.log('newGrid without bombs', newGrid);

        // Add Bombs to unique locations
        while (mines > 0) {
            let xPos = Math.floor(Math.random() * width);
            let yPos = Math.floor(Math.random() * height);

            if (newGrid[yPos][xPos] === 0) {
                newGrid[yPos][xPos] = 1;
                mines--;
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

    function revealAll() {
        console.log('Revealing All Cells');
        let newReveal = [];

        for (let i = 0; i < underlay.length; i++) {
            let newRow = [];
            for (let x = 0; x < underlay[0].length; x++) {
                newRow.push(0);
            }
            newReveal.push(newRow);
        }








        for (let y = 0; y < underlay.length; y++) {
            let newRow = [];
            console.log('underlay[y], y', underlay[y], y);
            for (let x = 0; x < underlay[0].length; x++) {
                console.log('y, x, underlay[y][x]', y, x, underlay[y][x]);
                if (underlay[y][x] === '&') {
                    console.log('mine, adding flag');
                    newRow.push(2);
                } else {
                    console.log('not a mine, reveal cell');
                    newRow.push(1);
                }
            }
            newReveal.push(newRow);
        }

        console.log('updating reveal array, newReveal:', newReveal);
        setReveal(newReveal);

    }

    // ____________________Flood Fill Function, Breadth First Search____________________
    function revealCell(enqueue, dequeue, changeReveal) {
        if (!completeness) {
            // enqueue and dequeue are arrays,
            // enqueue holds all things to be checked, begins with cell that was clicked
            // dequeue holds all things previously checked, begins as an empty array

            // console.log('Beginning revealCell');
            // console.log('enqueue', enqueue);
            // console.log('dequeue', dequeue);

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

            // console.log('elementToCheck, y, x', elementToCheck, y, x);

            // We must go through and check all 8 directions for each square 
            // and we only check them if they have not previously been checked

            // If the revealed cell is a bomb, we crash out - GOOD
            if (underlay[y][x] === '&') {
                setFinishMessage('YOU FUCKIN LOSE');
                setCompleteness(true);
                revealAll();
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

            // console.log('enqueue after pushes', enqueue);

            if (enqueue.length > 0) {
                revealCell(enqueue, dequeue, changeReveal);
            } else {
                setReveal(changeReveal);
            }

        }
        else {
            console.log('NOPE! THING IS DONE!');
        }
    }

    function flagCell(e, y, x) {
        e.preventDefault();
        if (!completeness) {

            let changeReveal = JSON.parse(JSON.stringify(reveal));

            if (changeReveal[y][x] !== 1) {
                if (changeReveal[y][x] === 2) {
                    changeReveal[y][x] = 0;
                } else {
                    changeReveal[y][x] = 2;
                }
            }

            setReveal(changeReveal);
        }
    }

    return (
        <>
            {/* <p>Underlay: {JSON.stringify(underlay)}</p>
            <p>Reveal: {JSON.stringify(reveal)}</p> */}

            {/* <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="number" />
            <button >New Game</button> */}

            <Grid container>
                <Grid item xs={4} s={4} align="center" style={{ marginBottom: 20 }}>
                    <>
                        <Tooltip title="This will set how wide your puzzle will be">
                            <TextField
                                id="standard-basic"
                                value={width}
                                label="Puzzle Width"
                                type="number"
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </Tooltip>
                    </>
                </Grid>
                <Grid item xs={4} s={4} align="center" style={{ marginBottom: 20 }}>
                    <>
                        <>
                            <Tooltip title="This will set how tall your puzzle will be">
                                <TextField
                                    id="standard-basic"
                                    value={height}
                                    label="Puzzle Height"
                                    type="number"
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </Tooltip>
                        </>
                    </>
                </Grid>
                <Grid item xs={4} s={4} align="center" style={{ marginBottom: 20 }}>
                    <>
                        <Tooltip title="This will set how many mines your puzzle will have">
                            <TextField
                                id="standard-basic"
                                value={difficulty}
                                label="Puzzle Difficulty"
                                type="number"
                                onChange={(e) => setDifficulty(e.target.value)}
                            />
                        </Tooltip>
                    </>
                </Grid>
                <Grid item xs={12} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(difficulty, width, height)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >Generate Minesweeper
                    </Button>
                </Grid>
            </Grid>

            {finishMessage !== "No Message" &&
                <p>{finishMessage}</p>}

            <table className="playtable">
                <tbody>
                    {/* TO DO: ADD SPECIALIZED CLASSNAMES AND CHANGE GAMEBOARD COLOR WHEN THINGS ARE BEING REVEALED */}
                    {
                        underlay && underlay.map((row, y) =>

                            <tr key={y + 'elementRow'}>


                                {
                                    row.map((element, x) =>
                                        <td
                                            key={y + 'element' + x}
                                            onClick={() => revealCell([[y, x]], [])}
                                            onContextMenu={(event) => flagCell(event, y, x)}
                                            className={"reveal" + reveal[y][x] + " element" + element}
                                        >
                                            {
                                                reveal[y][x] === 0 ?
                                                    ('')
                                                    :
                                                    (reveal[y][x] === 1 ?
                                                        (underlay[y][x] > 0 && element)
                                                        :
                                                        <FlagIcon style={{ fontSize: 20, color: 'maroon' }} />
                                                    )
                                            }
                                        </td>
                                    )
                                }
                            </tr>



                        )
                    }


                </tbody>
            </table>

            <Grid container>

                {/* Small Minesweeper Auto Generations */}
                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(8, 10, 10, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Small Easy
                    </Button>
                </Grid>

                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(14, 10, 10, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Small Normal
                    </Button>
                </Grid>

                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(20, 10, 10, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Small Hard
                    </Button>
                </Grid>

                {/* Medium Minesweeper Auto Generations */}
                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(16, 20, 20, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Medium Easy
                    </Button>
                </Grid>

                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(50, 20, 20, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Medium Normal
                    </Button>
                </Grid>

                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(75, 20, 20, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Medium Hard
                    </Button>
                </Grid>

                {/* Large Minesweeper Auto Generations */}
                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(30, 30, 30, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Large Easy
                    </Button>
                </Grid>

                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(60, 30, 30, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Large Normal
                    </Button>
                </Grid>

                <Grid item xs={4} align="center" style={{ marginBottom: 20 }}>
                    <Button
                        variant="contained"
                        onClick={() => generateMinesweeper(100, 30, 30, true)}
                        style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                    >
                        Large Hard
                    </Button>
                </Grid>

            </Grid>

        </>
    )
}

export default Minesweeper;

