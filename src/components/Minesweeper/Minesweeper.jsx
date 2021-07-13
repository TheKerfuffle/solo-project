import { useState, useEffect } from 'react';
import './Minesweeper.css';
import MinesweeperElement from './MinesweeperElement';

function Minesweeper() {

    const [sampleMines, setSampleMines] = useState(
        [
            [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
            [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
            [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
            [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0]
        ]
    );

    const thing =
        [
            [1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
            [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 1, 0, 0, 0]
        ]
    const [underlay, setUnderlay] = useState([]);
    const [difficulty, setDifficulty] = useState(1);
    const [size, setSize] = useState(10)

    // On Page load, generate a new Minesweeper game
    useEffect(() => {
        generateUnderlay(difficulty, size);
        console.log(sampleMines[-1]);
        console.log('Minesweeper Mounted');
    }, [])

    function generateUnderlay(difficulty, size) {
        console.log('difficulty', difficulty);
        console.log('size', size);
        let newUnderlay = []
        for (let y = 0; y < sampleMines.length; y++) {
            let underlayRow = [];
            for (let x = 0; x < sampleMines[y].length; x++) {
                let clueValue = 0;
                // if the current block is a bomb, don't do anything with it
                if (sampleMines[y][x] === 1) {
                    console.log('Bomb, y, x', y, x);
                    underlayRow.push({ value: '&', reveal: false });
                } else {
                    // Since we know this space does not hold a bomb...
                    // We want to check all of the blocks around the current block
                    // and add up all of the bombs this will determine its behavior

                    // If y=0, no y-1
                    // If y=sampleMines.length, no y+1
                    // If x=0, no x-1
                    // or x=sampleMines[y].length, no x+1

                    // First we check for corners
                    if (y === 0 && x === 0) {
                        console.log('Top Left Corner, y, x', y, x);
                        // x+1
                        if (sampleMines[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x+1, y+1
                        if (sampleMines[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y+1
                        if (sampleMines[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    } else if (y === 0 && x === sampleMines[0].length) {
                        console.log('Top Right Corner, y, x', y, x);
                        // x-1
                        if (sampleMines[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x-1, y+1
                        if (sampleMines[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y+1
                        if (sampleMines[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    } else if (y === sampleMines.length - 1 && x === 0) {
                        console.log('Bottom Left Corner, y, x', y, x);
                        // x+1
                        if (sampleMines[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x+1, y-1
                        if (sampleMines[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y-1
                        if (sampleMines[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    } else if (y === sampleMines.length - 1 && x === sampleMines[sampleMines.length - 1].length - 1) {
                        console.log('Bottom Right Corner, y, x', y, x);
                        // x-1
                        if (sampleMines[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // x-1, y-1
                        if (sampleMines[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        // y-1
                        if (sampleMines[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    }

                    // Next we check for edges
                    // y=0
                    else if (y === 0) {
                        console.log('Top Edge, y, x', y, x);
                        // no y-1
                        if (sampleMines[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                    }

                    // x=0
                    else if (x === 0) {
                        console.log('Left Edge, y, x', y, x);
                        // no x-1
                        if (sampleMines[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                    }

                    // y=sampleMines.length
                    else if (y === sampleMines.length - 1) {
                        console.log('Bottom Edge, y, x', y, x);
                        // no y+1
                        if (sampleMines[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    }
                    // x=sampleMines[y].length
                    else if (x === sampleMines[y].length - 1) {
                        console.log('Right Edge, y, x', y, x);
                        // no x+1
                        if (sampleMines[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                        if (sampleMines[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                    }
                    // Otherwise we check everything
                    else {
                        console.log('Normal Square, y, x', y, x);

                        // Check Up             [y-1]   [x]
                        if (sampleMines[y - 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Up Right       [y-1]   [x+1]
                        if (sampleMines[y - 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Right          [y]     [x+1]
                        if (sampleMines[y][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Down Right     [y+1]   [x+1]
                        if (sampleMines[y + 1][x + 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Down           [y+1]   [x]
                        if (sampleMines[y + 1][x] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Down Left      [y+1]   [x-1]
                        if (sampleMines[y + 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Left           [y]     [x-1]
                        if (sampleMines[y][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }

                        // Check Up Left        [y-1]   [x-1]
                        if (sampleMines[y - 1][x - 1] === 1) {
                            clueValue += 1;
                            console.log('increasing clueValue', clueValue);
                        }
                    }
                    console.log('finished clue, y, x', y, x);
                    underlayRow.push({ value: clueValue, reveal: false });
                }
            }
            console.log('Finished underlay Row', underlayRow);
            newUnderlay.push(underlayRow);
        }
        console.log('Finished underlay', newUnderlay);
        setUnderlay(newUnderlay);
    }

    // function revealElement(element, y, x) {
    //     console.log('logging overlay click, underlay value, y, x', underlay[y][x], y, x);
    //     setUnderlay(...underlay, underlay[y][x] = { value: element, reveal: true });
    // }

    function renderMinesweeper() {
        return (
            <>
                {
                    underlay && underlay.map((row, y) =>
                        <tr key={'row' + y}>
                            {
                                row.map((element, x) =>

                                    // element.reveal ? (
                                    //     // Underlay
                                    //     <td>{element.value}</td>
                                    // ) : (
                                    //     // Overlay
                                    //     <td onClick={() => revealElement(element.value, y, x)}></td>
                                    // )

                                    <MinesweeperElement
                                        underlay={underlay}
                                        element={element.value}
                                        reveal={element.reveal}
                                        y={y}
                                        x={x}
                                        key={y + 'element' + x}
                                    />

                                )
                            }
                        </tr>
                    )
                }
            </>
        )
    }


    return (
        <>
            <p>Sample Mines: {JSON.stringify(sampleMines)}</p>
            <p>Underlay: {JSON.stringify(underlay)}</p>
            <p>Difficulty buttons go here</p>
            <p>Size buttons go here</p>
            <table className="playtable">
                <tbody>

                    {renderMinesweeper()}

                </tbody>
            </table>
        </>
    )
}

export default Minesweeper;