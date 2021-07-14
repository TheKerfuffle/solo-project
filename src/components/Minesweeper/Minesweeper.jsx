import { useState } from "react";


function Minesweeper() {

    const [minesBoard, setMinesBoard] = useState([])

    function generateMinesweeper(difficulty, width, height) {
        console.log('difficulty', difficulty);
        console.log('size', size);

        // For now generate a 10x10 grid with easy difficulty (10% of spaces are bombs)
        width = 10;
        height = 10;
        difficulty = .1;

        let newGrid = [];

        while (let i < height) {

            let newRow = [];

            while (let j<width){

            }
        }




        let newUnderlay = [];
        let newReveal = [];




        for (let y = 0; y < newGrid.length; y++) {
            let underlayRow = [];
            let newRevealRow = [];
            for (let x = 0; x < newGrid[y].length; x++) {
                let clueValue = 0;
                // if the current block is a bomb, don't do anything with it
                if (newGrid[y][x] === 1) {
                    console.log('Bomb, y, x', y, x);
                    underlayRow.push('&');
                    newReveal.push(false);
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
                    newRevealRow.push(false);
                }
            }
            console.log('Finished underlay Row', underlayRow);
            newUnderlay.push(underlayRow);
            newReveal.push(newRevealRow);
        }
        console.log('Finished underlay', newUnderlay);
        setUnderlay(newUnderlay);
    }

    return (
        <>

        </>
    )
}

export default Minesweeper;