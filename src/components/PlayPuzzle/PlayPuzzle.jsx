import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import GridElement from '../GridElement/GridElement';
import HClue from '../HClue/HClue';
import Timer from '../Timer/Timer';
import VClue from '../VClue/VClue';
import './PlayPuzzle.css';



function PlayPuzzle() {


    const hGridData = useSelector(store => store.hGrid);
    const vGridData = useSelector(store => store.vGrid);
    const attempt = useSelector(store => store.attempt);
    const solution = useSelector(store => store.solution);

    const dispatch = useDispatch();
    const history = useHistory();

    let [mistakes, setMistakes] = useState(0);
    let [mistakeMessage, setMistakeMessage] = useState('');

    useEffect(() => {
        dispatch({ type: 'GET_RANDOM_PUZZLE' });
    }, [])

    function saveProgress() {
        if (attempt.id === 0) {

            dispatch({ type: 'POST_NEW_ATTEMPT', payload: attempt });
        } else {

            dispatch({ type: 'UPDATE_ATTEMPT', payload: attempt })
        }
    }

    function deleteProgress() {
        if (attempt.id === 0) {
            confirm('No Saved Data')
        } else {
            if (confirm("ARE YOU SURE YOU WANT TO DELETE YOUR PROGRESS?")) {
                dispatch({ type: 'DELETE_ATTEMPT', payload: solution })
                history.push('/home');
            }

        }
    }

    function checkSolution() {
        // Current attempt input data
        let current = attempt.input_data;
        // Current puzzle correct data
        let correct = solution.solution_data;

        let totalMistakes = 0;

        // Check every item in the attempt against all correct input points
        for (let i = 0; i < correct.length; i++) {
            for (let j = 0; j < correct[i].length; j++) {
                if (current[i][j] === 2 && correct[i][j] === 1) {
                    totalMistakes++;
                    console.log('adding mistake', totalMistakes);
                    setMistakeMessage(`There are ${totalMistakes} mistakes in this puzzle`)
                }

                if (current[i][j] === 1 && correct[i][j] === 0) {
                    totalMistakes++;
                    console.log('adding mistake', totalMistakes);
                    setMistakeMessage(`There are ${totalMistakes} mistakes in this puzzle`)
                }
            }
        }

        if (totalMistakes === 0) {
            setMistakeMessage(`There are no mistakes in this puzzle`);
        } else if (totalMistakes === 1) {
            setMistakeMessage(`There is 1 mistake in this puzzle`);
        }

    }

    function newRandomPuzzle() {
        setMistakeMessage('');
        setMistakes(0);
        dispatch({ type: 'RESET_V_GRID' });
        dispatch({ type: 'RESET_H_GRID' });
        dispatch({ type: 'RESET_ATTEMPT' });
        dispatch({ type: 'RESET_SOLUTION' });
        dispatch({ type: 'GET_RANDOM_PUZZLE' });
    }

    return (
        <>
            {/* { gridData == undefined ? (<> </>):(JSON.stringify(gridData.tabledata)) } */}
            {/* { hData == [] ? (<> </>):(JSON.stringify(hData)) } */}

            { solution && <h1>{solution.title}</h1>}
            <button onClick={saveProgress}>Save Progress</button>
            <button onClick={deleteProgress}>Delete Progress</button>
            <button onClick={newRandomPuzzle}>New Random Puzzle</button>
            <button onClick={checkSolution}>Check Solution</button>

            {attempt.completed ? <h4>Completed!</h4> : ''}
            {mistakeMessage === '' ? '' : <h4>{mistakeMessage}</h4>}

            <table>
                <tbody>

                    {
                        vGridData.tableData.map((item, i) => (
                            <tr key={i}>
                                {hGridData.fillerGrid.map(() => (
                                    <td className="filler"></td>
                                ))}

                                {item.map((clue, j) => (
                                    <VClue key={j} clue={clue} />
                                ))}
                            </tr>
                        ))
                    }

                    {
                        attempt.input_data.map((item, i) => (
                            <>
                                <tr key={i}>
                                    {/* In each row, the clues come first, which have 
                                            already been processed to the format we need */}
                                    {
                                        hGridData.tableData[i].map((clue, k) => (
                                            <HClue key={k} clue={clue} />
                                        ))
                                    }

                                    {
                                        item.map((value, j) => (
                                            <GridElement key={j} id={j} value={value} position={[i, j]} />
                                        ))
                                    }
                                </tr>
                            </>

                        ))
                    }




                </tbody>
            </table>


        </>
    )
}

export default PlayPuzzle;