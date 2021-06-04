import { useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import NewPuzzleItem from "../NewPuzzleItem/NewPuzzleItem";

// MUI Core: 
import {
    Paper, Typography, List,
    Toolbar, AppBar, CssBaseline,
    Drawer, Button, IconButton,
    Divider, Grid, Tooltip, TextField
} from '@material-ui/core/';


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
        setWidth(0);
        setHeight(0);
        setTitle('');
    }



    return (
        <>
            <Grid container>
                <Grid item xs={3} align="center" style={{ marginBottom: 20 }}>
                    <Tooltip title="Start by giving your puzzle a name">
                        <TextField
                            id="standard-basic"
                            value={title}
                            label="Puzzle Title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={3} align="center" style={{ marginBottom: 20 }}>
                    {title === '' ? '' :
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
                    }

                </Grid>
                <Grid item xs={3} align="center" style={{ marginBottom: 20 }}>
                    {width <= 0 ?
                        ''
                        :
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

                    }
                </Grid>
                <Grid item xs={3} align="center" style={{ marginBottom: 20 }}>
                    {height <= 0 ?
                        ''
                        :
                        <Button
                            variant="contained"
                            onClick={generateGrid}
                            style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                        >Generate Puzzle Grid
                        </Button>
                    }

                </Grid>
            </Grid>


            <Grid container>
                <Grid item xs={12} align="center" style={{ marginBottom: 20 }}>
                    {
                        newPuzzle.title === ''
                            ?
                            ''
                            :
                            <Button
                                variant="contained"
                                onClick={sendNewPuzzle}
                                style={{ marginBottom: 20, color: 'white', backgroundColor: 'maroon' }}
                            >Add Puzzle
                            </Button>
                    }
                </Grid>
                <Grid item xs={12} align="center">
                    {newPuzzle ?
                        <>
                            <table className="addPuzzleTable">
                                <tbody>
                                    {newPuzzle.solution_data &&

                                        newPuzzle.solution_data.map((row, i) => (
                                            <tr key={i}>
                                                {row.map((value, j) => (
                                                    <NewPuzzleItem
                                                        key={j + 'element' + i}
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
                </Grid>
            </Grid>
        </>
    )
}

export default AddPuzzle;