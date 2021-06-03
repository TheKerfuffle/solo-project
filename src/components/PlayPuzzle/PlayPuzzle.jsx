import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
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
    const user = useSelector(store => store.user);
    const randID = useSelector(store => store.randomPuzzleID);

    let [time, setTime] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    let [mistakeMessage, setMistakeMessage] = useState('');

    useEffect(() => {
        // Coming from /play - get a random puzzle
        // gets a random puzzle id and updates a reducer that we watch 
        if (!id && randID === 0) {
            dispatch({ type: 'GET_RANDOM_PUZZLE' });
        } else if (!id && randID > 0) {
            dispatch({type: 'RESET_RANDOM_ID'});
            console.log('pushing!', randID);
            history.push(`/play/${randID}`);
        }
        // COMING FROM PROFILE PAGE - No puzzle yet
        else if (solution.id !== id && attempt.puzzle_id !== id) {
            dispatch({ type: 'GET_PUZZLE', payload: id });
        }

        const clock = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000);

        return (() => clearInterval(clock))

    }, [randID]);

    // This sets the timer on the DOM to the user's saved time
    useEffect(() => {
        setTime(attempt.timer);
        // console.log('TIME HAS BEEN SET');
    }, [attempt])

    useEffect(() => {


    }, [])

    const renderTime = poop => {
        // setTime(poop);
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }

    function saveProgress() {
        let attemptToSave = attempt;
        attemptToSave.timer = time;
        if (attempt.id === 0) {
            dispatch({ type: 'POST_NEW_ATTEMPT', payload: attemptToSave });
        } else {
            dispatch({ type: 'UPDATE_ATTEMPT', payload: attemptToSave });
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
                        timer: time,
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
                        timer: time,
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

            {/* Timer from attempt reducer */}
            {
                attempt.timer > 0
                    ?
                    <h3>renderTime: {renderTime(attempt.timer)}</h3>
                    :
                    <h3>renderTime: {renderTime(0)}</h3>
            }

            {
                attempt
                    ?
                    <h3>attempt.timer: {attempt.timer}</h3>
                    :
                    ''
            }



            <table className="playtable">
                <tbody>
                    {
                        vGridData.tableData.map((item, i) => (
                            <tr key={'top' + i}>
                                {hGridData.fillerGrid.map((filler, k) => (
                                    <td key={'filler' + k} className="filler"></td>
                                ))}

                                {item.map((clue, j) => (
                                    <VClue key={'vclue' + j} clue={clue} />
                                ))}
                            </tr>
                        ))
                    }

                    {attempt.puzzle_id > 0 && 
                        attempt.input_data.map((item, i) => (
                            <tr key={'bottom' + i}>
                                {/* In each row, the clues come first, which have 
                                            already been processed to the format we need */}
                                {
                                    hGridData.tableData[i].map((clue, k) => (
                                        <HClue key={'hclue' + k} clue={clue} />
                                    ))
                                }

                                {
                                    item.map((value, j) => (
                                        <GridElement key={attempt.id+'grid' + j} id={j} value={value} position={[i, j]} time={time} />
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </>
    )
}

export default PlayPuzzle;