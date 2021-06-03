import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

// MUI Core:
import {
    Grid, Paper, Typography,
    List, Toolbar, AppBar,
    Button,
    IconButton
} from '@material-ui/core/';

// MUI Icons:
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


function ProfileItem({ profileType, attempt }) {

    const dispatch = useDispatch();
    const history = useHistory();

    function deleteAttempt() {
        dispatch({
            type: 'DELETE_ATTEMPT', payload: {
                id: attempt.puzzle_id,
                title: attempt.title,
                solution_data: attempt.solution_data,
                creator_id: attempt.creator_id
            }
        })
        history.push('/profile');
    }

    function deleteRaw() {
        dispatch({ type: 'DELETE_RAW_PUZZLE', payload: attempt })
    }

    function goPlay() {
        history.push(`/play/${attempt.id}`)
    }


    return (
        <>
            <Grid container>
                <Grid item xs={1}>

                </Grid>
                <Paper>

                    <Grid item xs={8}>

                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                </Paper>
                <Grid item xs={1}>

                </Grid>
            </Grid>











            {
                profileType === 0
                    ?
                    <li>
                        {attempt.title}, Completed in: {attempt.timer}
                        <IconButton
                            color="inherit"
                            aria-label="delete progress"
                            onClick={deleteAttempt}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </li>
                    :
                    profileType === 1
                        ?
                        <>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container>



                                        <Grid item xs={1}>

                                        </Grid>
                                        <Paper>
                                            <Grid item xs={10}>
                                                <Grid container>
                                                    <Grid item xs={10}>
                                                        <Typography component="h6">
                                                            {attempt.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            color="inherit"
                                                            aria-label="play puzzle"
                                                            onClick={goPlay}
                                                        >
                                                            <ArrowRightAltIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton
                                                            color="inherit"
                                                            aria-label="delete progress"
                                                            onClick={deleteRaw}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                        <Grid item xs={1}>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>







                        </>
                        :
                        <li>
                            {attempt.title}


                            <IconButton
                                color="inherit"
                                aria-label="play puzzle"
                                onClick={goPlay}
                            >
                                <ArrowRightAltIcon />
                            </IconButton>

                            <IconButton
                                color="inherit"
                                aria-label="delete progress"
                                onClick={deleteAttempt}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </li>
            }
        </>
    )
}

export default ProfileItem;