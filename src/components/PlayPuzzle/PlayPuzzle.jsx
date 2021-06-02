import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import GridElement from '../GridElement/GridElement';
import HClue from '../HClue/HClue';
import Timer from '../Timer/Timer';
import VClue from '../VClue/VClue';
import './PlayPuzzle.css';



function PlayPuzzle() {

    const countRef = useRef(null);

    const hGridData = useSelector(store => store.hGrid);
    const vGridData = useSelector(store => store.vGrid);
    const attempt = useSelector(store => store.attempt);
    const solution = useSelector(store => store.solution);
    const user = useSelector(store => store.user);

    let [time, setTime] = useState(attempt.timer);
    let [wait, setWait] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    let [mistakeMessage, setMistakeMessage] = useState('');

    useEffect(() => {
        dispatch({ type: 'GET_PUZZLE', payload: id });

        countRef.current = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000);

        // Loads Puzzle Grid after 500 ms 
        // - helps get the new table data upon page load
        setTimeout(() => {
            setWait(false);
        }, 500);

        return (() => clearInterval(countRef.current))
    }, []);

    function saveProgress() {
        let attemptToSave = attempt;
        attemptToSave.timer = time;
        if (attempt.id === 0) {
            dispatch({ type: 'POST_NEW_ATTEMPT', payload: attempt });
        } else {
            dispatch({ type: 'UPDATE_ATTEMPT', payload: attempt });
        }
    }

    function deleteProgress() {
        if (attempt.id === 0) {
            confirm('No Saved Data')
        } else {
            if (confirm("DELETE YOUR PROGRESS AND RETRY?")) {
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
        let totalCorrectInput = 0;
        let solutionTotal = 0;
        let totalMistakes = 0;

        // Check every item in the attempt against all correct input points
        for (let i = 0; i < correct.length; i++) {
            for (let j = 0; j < correct[i].length; j++) {
                if (current[i][j] === 2 && correct[i][j] === 1) {
                    totalMistakes++;
                    // console.log('adding mistake', totalMistakes);
                }
                if (current[i][j] === 1 && correct[i][j] === 0) {
                    totalMistakes++;
                    // console.log('adding mistake', totalMistakes);
                }

                // If solution is 1, we check to see if attempt is 1, these numbers 
                // should be the same if the user has successfully completed the puzzle
                if (correct[i][j] === 1) {
                    solutionTotal++;
                    if (current[i][j] === 1) {
                        totalCorrectInput++;
                    }
                }
            }
        }

        if (totalMistakes === 0) {
            setMistakeMessage(`There are no mistakes in this puzzle`);
        } else if (totalMistakes === 1) {
            setMistakeMessage(`There is 1 mistake in this puzzle`);
        } else {
            setMistakeMessage(`There are ${totalMistakes} mistakes in this puzzle`)
        }

        if (solutionTotal === totalCorrectInput) {
            if (attempt.id === 0) {
                dispatch({
                    type: 'POST_NEW_ATTEMPT', payload: {
                        id: attempt.id,
                        player_id: user.id,
                        puzzle_id: attempt.puzzle_id,
                        timer: attempt.timer,
                        input_data: attempt.input_data,
                        completed: true
                    }
                });
            } else {
                dispatch({
                    type: 'UPDATE_ATTEMPT', payload: {
                        id: attempt.id,
                        player_id: user.id,
                        puzzle_id: attempt.puzzle_id,
                        timer: attempt.timer,
                        input_data: attempt.input_data,
                        completed: true
                    }
                });
            }
        }

    }

    function newRandomPuzzle() {
        history.push(`/play`);
    }

    const renderTime = () => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }

    return (
        <>
            { solution && <h1>{solution.title}</h1>}
            <button onClick={saveProgress}>Save Progress</button>
            <button onClick={deleteProgress}>Delete Progress</button>
            <button onClick={newRandomPuzzle}>New Random Puzzle</button>
            <button onClick={checkSolution}>Check Solution</button>

            {attempt.completed ? <h3>Completed!</h3> : ''}
            {mistakeMessage === '' ? '' : <h4>{mistakeMessage}</h4>}

            {solution ?
                <>
                    <h5>'Puzzle ID:' {solution.id}</h5>
                    <h5>'Param ID:' {id}</h5>
                </>
                :
                ''}
            {
                attempt
                    ?
                    <h3>{renderTime()}</h3>
                    :
                    ''
            }

{
                attempt
                    ?
                    <h3>{attempt.timer}</h3>
                    :
                    ''
            }

            {
                wait ?
                    ''
                    :
                    <table className="playtable">
                        <tbody>
                            {
                                vGridData.tableData.map((item, i) => (
                                    <tr key={i}>
                                        {hGridData.fillerGrid.map((filler, k) => (
                                            <td key={k} className="filler"></td>
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
            }

        </>
    )
}

export default PlayPuzzle;