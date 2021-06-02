import { useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import NewPuzzleItem from "../NewPuzzleItem/NewPuzzleItem";


function AddPuzzle() {

    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0);
    let [title, setTitle] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const newPuzzle = useSelector(store => store.newPuzzle);
    const user = useSelector(store => store.user)

    function generateGrid() {

        dispatch({
            type: 'MAKE_NEW_PUZZLE',
            payload: {
                creator_id: user.id,
                solution_data: [],
                title: title,
                height: height,
                width: width
            }
        });
    }

    function sendNewPuzzle() {
        dispatch({ type: 'POST_NEW_PUZZLE', payload: newPuzzle });
        history.push('/play');
    }



    return (
        <>
            <label>title</label>
            <input
                value={title}
                label="Puzzle Title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
            />
            {title === '' ? '' :
                <>
                    <label>width</label>
                    <input
                        value={width}
                        label="width"
                        type="number"
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </>
            }
            {width <= 0 ?
                ''
                :
                <>
                    <label>height</label>
                    <input
                        value={height}
                        label="height"
                        type="number"
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </>

            }

            {height <= 0 ?
                ''
                :
                <button onClick={generateGrid}>Generate Grid</button>
            }

            {
                newPuzzle.title === '' ? '' : <button onClick={sendNewPuzzle}>Add Puzzle</button>
            }

            {newPuzzle ?
                <>

                    <table className="addPuzzleTable">
                        <tbody>
                            {newPuzzle.solution_data &&

                                newPuzzle.solution_data.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((value, j) => (
                                            <NewPuzzleItem
                                                key={j}
                                                position={[i, j]}
                                                value={value}
                                            />
                                        ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
                :
                ''
            }
        </>
    )
}

export default AddPuzzle;