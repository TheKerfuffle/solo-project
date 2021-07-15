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
    }, [reveal])


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
                    newRevealRow.push(false);
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

            console.log('finished reveal row', newRevealRow);
            newReveal.push(newRevealRow);

            console.log('pushed to newReveal, reveal:', newReveal);
        }
        console.log('Finished underlay', newUnderlay);
        setUnderlay(newUnderlay);
        setReveal(newReveal);
    }



    // ________________________________________Reveal Function________________________________________
    function revealElement(y, x, nestedArray) {

        console.log('in revealElement, y, x, nestedArray', y, x, nestedArray);

        // Create a copy of reveal with JSON
        let changeReveal = JSON.parse(JSON.stringify(nestedArray));

        // if (reveal[y][x] === false) {

        // }


        if (underlay[y][x] === '&') {
            alert('YOU FUCKIN LOSE')
        }

        // If the revealed element has a value of zero, we want to reveal all surrounding elements
        // But only under specific circumstances...
        else if (underlay[y][x] === 0) {

            // _____CORNERS_____

            // TOP LEFT X=0, Y=0
            if (x === 0 && y === 0) {

                // DOWN
                revealElement(y + 1, x, changeReveal);

                // DOWN RIGHT
                revealElement(y + 1, x + 1, changeReveal);

                // RIGHT
                revealElement(y, x + 1, changeReveal);
            }

            // BOTTOM LEFT X=0, Y=UNDERLAY.LENGTH-1
            else if (x === 0 && y === underlay.length - 1) {
                // UP
                if (reveal[y - 1][x] === false) {
                    revealElement(y - 1, x, changeReveal);
                }

                // UP RIGHT
                if (reveal[y - 1][x + 1] === false) {
                    revealElement(y - 1, x + 1, changeReveal);
                }

                // RIGHT
                if (reveal[y][x + 1] === false) {
                    revealElement(y, x + 1, changeReveal);
                }
            }

            // BOTTOM RIGHT X=UNDERLAY[0].LENGTH, Y=UNDERLAY.LENGTH
            else if (x === underlay[0].length - 1 && y === underlay.length - 1) {
                // LEFT
                if (reveal[y][x - 1] === false) {
                    revealElement(y, x - 1, changeReveal);
                }

                // UP LEFT
                if (reveal[y - 1][x - 1] === false) {
                    revealElement(y - 1, x - 1, changeReveal);
                }

                // UP
                if (reveal[y - 1][x] === false) {
                    revealElement(y - 1, x, changeReveal);
                }
            }

            // TOP RIGHT X=UNDERLAY[0].LENGTH, Y=0
            else if (x === underlay[0].length - 1 && y === 0) {
                // DOWN
                if (reveal[y + 1][x] === false) {
                    revealElement(y + 1, x, changeReveal);
                }

                // DOWN LEFT
                if (reveal[y + 1][x - 1] === false) {
                    revealElement(y + 1, x - 1, changeReveal);
                }

                // LEFT
                if (reveal[y][x - 1] === false) {
                    revealElement(y, x - 1, changeReveal);
                }
            }

            // _____EDGES_____

            // TOP EDGE
            else if (y === 0) {
                // RIGHT
                if (reveal[y][x + 1] === false) {
                    revealElement(y, x + 1, changeReveal);
                }

                // DOWN RIGHT
                if (reveal[y + 1][x + 1] === false) {
                    revealElement(y + 1, x + 1, changeReveal);
                }

                // DOWN
                if (reveal[y + 1][x] === false) {
                    revealElement(y + 1, x, changeReveal);
                }

                // DOWN LEFT
                if (reveal[y + 1][x - 1] === false) {
                    revealElement(y + 1, x - 1, changeReveal);
                }

                // LEFT
                if (reveal[y][x - 1] === false) {
                    revealElement(y, x - 1, changeReveal);
                }
            }

            // BOTTOM EDGE
            else if (y === underlay.length - 1) {
                // LEFT
                if (reveal[y][x - 1] === false) {
                    revealElement(y, x - 1, changeReveal);
                }

                // UP LEFT
                if (reveal[y - 1][x - 1] === false) {
                    revealElement(y - 1, x - 1, changeReveal);
                }

                // UP
                if (reveal[y - 1][x] === false) {
                    revealElement(y - 1, x, changeReveal);
                }

                // UP RIGHT
                if (reveal[y - 1][x + 1] === false) {
                    revealElement(y - 1, x + 1, changeReveal);
                }

                // RIGHT
                if (reveal[y][x + 1] === false) {
                    revealElement(y, x + 1, changeReveal);
                }

            }

            // LEFT EDGE
            else if (x === 0) {
                // UP
                if (reveal[y - 1][x] === false) {
                    revealElement(y - 1, x, changeReveal);
                }

                // UP RIGHT
                if (reveal[y - 1][x + 1] === false) {
                    revealElement(y - 1, x + 1, changeReveal);
                }

                // RIGHT
                if (reveal[y][x + 1] === false) {
                    revealElement(y, x + 1, changeReveal);
                }

                // DOWN RIGHT
                if (reveal[y + 1][x + 1] === false) {
                    revealElement(y + 1, x + 1, changeReveal);
                }

                // DOWN
                if (reveal[y + 1][x] === false) {
                    revealElement(y + 1, x, changeReveal);
                }
            }

            // RIGHT EDGE
            else if (x === underlay[0].length - 1) {
                // DOWN
                if (reveal[y + 1][x] === false) {
                    revealElement(y + 1, x, changeReveal);
                }

                // DOWN LEFT
                if (reveal[y + 1][x - 1] === false) {
                    revealElement(y + 1, x - 1, changeReveal);
                }

                // LEFT
                if (reveal[y][x - 1] === false) {
                    revealElement(y, x - 1, changeReveal);
                }

                // UP LEFT
                if (reveal[y - 1][x - 1] === false) {
                    revealElement(y - 1, x - 1, changeReveal);
                }

                // UP
                if (reveal[y - 1][x] === false) {
                    revealElement(y - 1, x, changeReveal);
                }
            }

            // _____INNER SQUARES_____
            else {
                // UP
                if (reveal[y - 1][x] === false) {
                    revealElement(y - 1, x, changeReveal);
                }

                // UP RIGHT
                if (reveal[y - 1][x + 1] === false) {
                    revealElement(y - 1, x + 1, changeReveal);
                }

                // RIGHT
                if (reveal[y][x + 1] === false) {
                    revealElement(y, x + 1, changeReveal);
                }

                // DOWN RIGHT
                if (reveal[y + 1][x + 1] === false) {
                    revealElement(y + 1, x + 1, changeReveal);
                }

                // DOWN
                if (reveal[y + 1][x] === false) {
                    revealElement(y + 1, x, changeReveal);
                }

                // DOWN LEFT
                if (reveal[y + 1][x - 1] === false) {
                    revealElement(y + 1, x - 1, changeReveal);
                }

                // LEFT
                if (reveal[y][x - 1] === false) {
                    revealElement(y, x - 1, changeReveal);
                }

                // UP LEFT
                if (reveal[y][x] === false) {
                    revealElement(y - 1, x - 1, changeReveal);
                }
            }
        }



        // console.log(reveal);
        // console.log(changeReveal);

        // console.log('clicked on element y, x, reveal[y][x]', y, x, reveal[y][x]);
        // console.log('clicked on element y, x, changeReveal[y][x]', y, x, changeReveal[y][x]);

        // Create a copy of reveal with JSON
        // let changeReveal = JSON.parse(JSON.stringify(reveal));

        // Set the clicked element's reveal variable to true
        changeReveal[y][x] = true;

        // Update the State variable
        setReveal(changeReveal);

    }

    // function revealCell(y, x) {


    //     // Check for bombs first
    //     if (underlay[y][x] === '&') {
    //         alert('YOU FUCKIN LOSE')
    //     }

    //     // See if we have checked this element already
    //     // if we have we do not allow it to be checked again
    //     let notChecked = true;
    //     for (let check of revealedCells) {
    //         if (check[0] === y && check[1] === x) {
    //             notChecked = false;
    //             console.log('cell has been checked, y, x', y, x);
    //         }
    //     }


    //     if (underlay[y][x] > 0) {

    //         if (notChecked) {

    //             let updateRevealedCells = JSON.parse(JSON.stringify(revealedCells));

    //             updateRevealedCells.push([y, x])

    //             setRevealedCells(updateRevealedCells);

    //             console.log('in revealCell for normal cell, y, x, array of checked spots', y, x, revealedCells);

    //             // Create a copy of reveal with JSON
    //             let changeReveal = JSON.parse(JSON.stringify(reveal));

    //             // Set the clicked element's reveal variable to true
    //             changeReveal[y][x] = true;

    //             // Update the State variable
    //             setReveal(changeReveal);
    //         } else {
    //             console.log('skipping a value>0 because already checked, y ,x', y, x);
    //         }

    //     } else {

    //         if (notChecked) {

    //             let updateRevealedCells = JSON.parse(JSON.stringify(revealedCells));

    //             updateRevealedCells.push([y, x])

    //             setRevealedCells(updateRevealedCells);

    //             console.log('in revealCell for normal cell, y, x, array of checked spots', y, x, revealedCells);

    //             // Create a copy of reveal with JSON
    //             let changeReveal = JSON.parse(JSON.stringify(reveal));

    //             // Set the clicked element's reveal variable to true
    //             changeReveal[y][x] = true;

    //             // Update the State variable
    //             setReveal(changeReveal);

    //             // ________________________________________BEGIN RECURSION FOR 0 VALUE________________________________________
    //             // _____CORNERS_____

    //             // TOP LEFT X=0, Y=0
    //             if (x === 0 && y === 0) {

    //                 // DOWN
    //                 revealCell(y + 1, x);

    //                 // DOWN RIGHT
    //                 revealCell(y + 1, x + 1);

    //                 // RIGHT
    //                 revealCell(y, x + 1);
    //             }

    //             // BOTTOM LEFT X=0, Y=UNDERLAY.LENGTH-1
    //             else if (x === 0 && y === underlay.length - 1) {
    //                 // UP
    //                 revealCell(y - 1, x);

    //                 // UP RIGHT
    //                 revealCell(y - 1, x + 1);

    //                 // RIGHT
    //                 revealCell(y, x + 1);
    //             }

    //             // BOTTOM RIGHT X=UNDERLAY[0].LENGTH-1, Y=UNDERLAY.LENGTH-1
    //             else if (x === underlay[0].length - 1 && y === underlay.length - 1) {
    //                 // LEFT
    //                 revealCell(y, x - 1);

    //                 // UP LEFT
    //                 revealCell(y - 1, x - 1);

    //                 // UP
    //                 revealCell(y - 1, x);
    //             }

    //             // TOP RIGHT X=UNDERLAY[0].LENGTH-1, Y=0
    //             else if (x === underlay[0].length - 1 && y === 0) {
    //                 // DOWN
    //                 revealCell(y + 1, x);

    //                 // DOWN LEFT
    //                 revealCell(y + 1, x - 1);

    //                 // LEFT
    //                 revealCell(y, x - 1);
    //             }

    //             // _____EDGES_____

    //             // TOP EDGE
    //             else if (y === 0) {
    //                 // RIGHT
    //                 revealCell(y, x + 1);

    //                 // DOWN RIGHT
    //                 revealCell(y + 1, x + 1);

    //                 // DOWN
    //                 revealCell(y + 1, x);

    //                 // DOWN LEFT
    //                 revealCell(y + 1, x - 1);

    //                 // LEFT
    //                 revealCell(y, x - 1);
    //             }

    //             // BOTTOM EDGE
    //             else if (y === underlay.length - 1) {
    //                 // LEFT
    //                 revealCell(y, x - 1);

    //                 // UP LEFT
    //                 revealCell(y - 1, x - 1);

    //                 // UP
    //                 revealCell(y - 1, x);

    //                 // UP RIGHT
    //                 revealCell(y - 1, x + 1);

    //                 // RIGHT
    //                 revealCell(y, x + 1);

    //             }

    //             // LEFT EDGE
    //             else if (x === 0) {
    //                 // UP
    //                 revealCell(y - 1, x);

    //                 // UP RIGHT
    //                 revealCell(y - 1, x + 1);

    //                 // RIGHT
    //                 revealCell(y, x + 1);

    //                 // DOWN RIGHT
    //                 revealCell(y + 1, x + 1);

    //                 // DOWN
    //                 revealCell(y + 1, x);
    //             }

    //             // RIGHT EDGE
    //             else if (x === underlay[0].length - 1) {
    //                 // DOWN
    //                 revealCell(y + 1, x);

    //                 // DOWN LEFT
    //                 revealCell(y + 1, x - 1);

    //                 // LEFT
    //                 revealCell(y, x - 1);

    //                 // UP LEFT
    //                 revealCell(y - 1, x - 1);

    //                 // UP
    //                 revealCell(y - 1, x);
    //             }

    //             // _____INNER SQUARES_____
    //             else {
    //                 // UP
    //                 revealCell(y - 1, x);

    //                 // UP RIGHT
    //                 revealCell(y - 1, x + 1);

    //                 // RIGHT
    //                 revealCell(y, x + 1);

    //                 // DOWN RIGHT
    //                 revealCell(y + 1, x + 1);

    //                 // DOWN
    //                 revealCell(y + 1, x);

    //                 // DOWN LEFT
    //                 revealCell(y + 1, x - 1);

    //                 // LEFT
    //                 revealCell(y, x - 1);

    //                 // UP LEFT
    //                 revealCell(y - 1, x - 1);
    //             }
    //         } else {
    //             console.log('skipping value of 0 because already checked, y, x', y, x);
    //         }
    //     }


    // }

    // ____________________Breadth First Search____________________
    function revealCell(enqueue, dequeue) {
        // enqueue and dequeue are arrays,
        // enqueue holds all things to be checked, begins with cell that was clicked
        // dequeue holds all things previously checked, begins as an empty array

        console.log('Beginning revealCell');
        console.log('enqueue', enqueue);
        console.log('dequeue', dequeue);

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
                    newRow.push(true);
                }
                newReveal.push(newRow)
            }
            setReveal(newReveal);
            alert('YOU FUCKIN LOSE');
        }

        // If the revealed cell is > 0, we do not do recursion - GOOD
        else if (underlay[y][x] > 0) {
            // Create a copy of reveal with JSON
            let changeReveal = JSON.parse(JSON.stringify(reveal));

            // Set the clicked element's reveal variable to true
            changeReveal[y][x] = true;

            // Update the State variable
            setReveal(changeReveal);
        }

        // If the revealed cell is 0, we begin a flood fill algorithm

        // BEGIN BY ADDING ALL 8 DIRECTIONS TO THE ENQUEUE ARRAY, 
        // WE ONLY ADD TO ENQUEUE IF THE VALUE HAS NOT ALREADY BEEN ADDED TO ENQUEUE OR IS IN DEQUEUE

        // UP - NO Y=0
        

        // UP RIGHT - NO Y=0 OR X=UNDERLAY[0].LENGTH-1

        // RIGHT - NO X=UNDERLAY[0].LENGTH-1

        // DOWN RIGHT - NO Y=UNDERLAY.LENGTH-1 OR X=UNDERLAY[0].LENGTH-1

        // DOWN - NO Y=UNDERLAY.LENGTH-1

        // DOWN LEFT - NO Y=UNDERLAY.LENGTH-1 OR X=0

        // LEFT - NO X=0

        // LEFT UP - NO Y=0 OR X=0



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


                            {row.map((element, x) =>
                                <td key={y + 'element' + x} onClick={() => revealCell([[y, x]], [])}>
                                    {reveal[y][x] && element}
                                </td>
                            )}
                        </tr>



                    )}
                </tbody>
            </table>



        </>
    )
}

export default Minesweeper;