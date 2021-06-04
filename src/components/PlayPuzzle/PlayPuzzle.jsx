import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import GridElement from '../GridElement/GridElement';
import HClue from '../HClue/HClue';
import VClue from '../VClue/VClue';
import './PlayPuzzle.css';

// Icons:
import CasinoIcon from '@material-ui/icons/Casino';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

// Custom Styles/Themes
import { makeStyles, useTheme } from '@material-ui/core/styles';

// MUI Core: 
import {
    Paper, Typography, List,
    Toolbar, AppBar, CssBaseline,
    Drawer, Button, IconButton,
    Divider, Grid, Tooltip, TextField
} from '@material-ui/core/';

function PlayPuzzle() {

    // REDUCERS!!!! ALL OF THEM(almost)!!!
    const hGridData = useSelector(store => store.hGrid);
    const vGridData = useSelector(store => store.vGrid);
    const attempt = useSelector(store => store.attempt);
    const solution = useSelector(store => store.solution);
    const user = useSelector(store => store.user);
    const randID = useSelector(store => store.randomPuzzleID);

    // Local state for use with the timer and setInterval
    let [time, setTime] = useState(0);
    // Local state for the Mistake message that displays after we check the solution
    let [mistakeMessage, setMistakeMessage] = useState('');

    // Useful Hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    // This useEffect is the resultant block of code that seeks to solve 
    // a lot of async issues with reducers and allows us to refresh 
    // the current page without losing the puzzle we were looking at
    useEffect(() => {
        // If we are coming from /play 
        // ...when we click the get random puzzle button, or use the nav button for Play
        // These conditional statements get a random puzzle id and updates a reducer that we watch
        if (!id && randID === 0) {
            dispatch({ type: 'GET_RANDOM_PUZZLE' });
        }
        // After we get a random id, we watch for it to be updated in the reducer,
        // then navigate to the page using params and reset the random id to 0
        else if (!id && randID > 0) {
            dispatch({ type: 'RESET_RANDOM_ID' });
            console.log('pushing!', randID);
            history.push(`/play/${randID}`);
        }
        // COMING FROM PROFILE PAGE OR we have just gone through the past 2 conditionals,
        // thus there is no puzzle yet and we must retrieve it!
        else if (solution.id !== id && attempt.puzzle_id !== id) {
            dispatch({ type: 'GET_PUZZLE', payload: id });
        }

        // When we load the page, Start the clock!
        const clock = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000);

        // When we leave the page, Stop the clock!
        return (() => clearInterval(clock))

        // Watch the randID 
    }, [randID]);

    // This sets the timer on the DOM to the user's saved time
    // Watches the attempt reducer in order to set the current timer 
    // to the current user's time when they last saved their progress
    useEffect(() => {
        setTime(attempt.timer);
    }, [attempt])

    // This function is called below to render the user's time to the dom
    // displays in an hour:minute:second format which looks nice
    const renderTime = () => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }

    // This function is called below to render the user's completed time
    // displays in an hour:minute:second format which looks nice.
    const displayTime = staticTime => {
        const getSeconds = `0${(staticTime % 60)}`.slice(-2);
        const minutes = `${Math.floor(staticTime / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(staticTime / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }

    // Saves the current attempt, along with local timer data, to the database
    // if there is already data saved to database, it will update that data
    function saveProgress() {
        let attemptToSave = attempt;
        attemptToSave.timer = time;
        if (attempt.id === 0) {
            dispatch({ type: 'POST_NEW_ATTEMPT', payload: attemptToSave });
        } else {
            dispatch({ type: 'UPDATE_ATTEMPT', payload: attemptToSave });
        }
    }

    // Deletes progress in database if attempt has been saved to the database
    function deleteProgress() {
        if (attempt.id === 0) {
            confirm('No Saved Data')
        } else {
            if (confirm("DELETE YOUR PROGRESS AND RETRY?")) {
                dispatch({ type: 'DELETE_ATTEMPT', payload: solution });
            }
        }
    }

    function checkSolution() {
        // Current attempt input data - user's filled in grid
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
                }
                if (current[i][j] === 1 && correct[i][j] === 0) {
                    totalMistakes++;
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
        // Sets the mistake message, which triggers the conditional rendering
        if (totalMistakes === 0) {
            setMistakeMessage(`There are no mistakes in this puzzle`);
        } else if (totalMistakes === 1) {
            setMistakeMessage(`There is 1 mistake in this puzzle`);
        } else {
            setMistakeMessage(`There are ${totalMistakes} mistakes in this puzzle`)
        }

        // If all inputs are correct and user has completed the puzzle,
        // we dispatch to save the progress, first we check to see if the user has saved yet
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

    // On click, redirects us to /play,
    // which will get a random puzzle ID and redirect to that puzzles page
    function newRandomPuzzle() {
        history.push(`/play`);
    }



    return (
        <>
            { solution &&
                <Typography variant="h2" align="center" style={{ textDecoration: "underline", marginBottom: 40 }}>
                    {solution.title}
                </Typography>
            }

            {attempt.completed ?
                <>
                    <Typography variant='h4' align="center" style={{ marginBottom: 20 }}>
                        Puzzle Complete!
                    </Typography>
                    <Typography variant='h4' align="center" style={{ marginBottom: 20 }}>
                        {displayTime(attempt.timer)}
                    </Typography>
                </>
                :
                <Typography variant='h4' align="center" style={{ marginBottom: 20 }}>
                    {renderTime()}
                </Typography>
            }

            <Grid container>
                {
                    mistakeMessage === ''
                        ?
                        ''
                        :
                        <Grid item xs={12}>
                            <Typography variant='h5' align="center" style={{ marginBottom: 20 }}>
                                {mistakeMessage}
                            </Typography>
                        </Grid>
                }

                <Grid item xs={12}>
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
                                                <GridElement key={attempt.id + 'grid' + j} id={j} value={value} position={[i, j]} time={time} />
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Grid>
            </Grid>

            <Grid container>

                <Grid item xs={3} align="center">

                </Grid>

                <Grid item xs={2} align="center">
                    <Tooltip title="Save Progress">
                        <IconButton
                            color="inherit"
                            aria-label="Play Random Puzzle"
                            onClick={saveProgress}
                        >
                            <SaveIcon style={{ fontSize: 50, color: 'maroon' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>

                <Grid item xs={2} align="center">
                    <Tooltip title="Delete Progress">
                        <IconButton
                            color="inherit"
                            aria-label="Play Random Puzzle"
                            onClick={deleteProgress}
                        >
                            <ClearIcon style={{ fontSize: 50, color: 'maroon' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>

                <Grid item xs={2} align="center">
                    <Tooltip title="Check Progress">
                        <IconButton
                            color="inherit"
                            aria-label="Play Random Puzzle"
                            onClick={checkSolution}
                        >
                            <CheckIcon style={{ fontSize: 50, color: 'maroon' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>

                <Grid item xs={3} align="center">

                </Grid>

            </Grid>
        </>
    )
}

export default PlayPuzzle;