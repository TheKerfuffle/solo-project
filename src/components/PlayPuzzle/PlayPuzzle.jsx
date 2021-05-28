import { useEffect } from 'react';
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

    useEffect(() => {
        dispatch({ type: 'GET_RANDOM_PUZZLE' });
    }, [])

    function saveProgress() {
        if (attempt.id === 0) {
            dispatch({ type: 'POST_NEW_ATTEMPT', payload: attempt })
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

    function newRandomPuzzle() {
        dispatch({type: 'RESET_V_GRID'});
        dispatch({type: 'RESET_H_GRID'});
        dispatch({type: 'RESET_ATTEMPT'});
        dispatch({type: 'RESET_SOLUTION'});
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
            {/* <Timer /> */}
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