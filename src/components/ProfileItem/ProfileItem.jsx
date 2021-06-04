import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

// Custom Styles/Themes
import { makeStyles, useTheme } from '@material-ui/core/styles';

// MUI Core:
import {
    Grid, Paper, Typography,
    List, Toolbar, AppBar,
    Button, Tooltip,
    IconButton
} from '@material-ui/core/';

// MUI Icons:
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles({
    menuBtn: {
        marginTop: 20,
        marginLeft: 20,

    },
    hover: {
        '&:hover': {
            backgroundColor: 'green',
        }
    },
    profileItem: {
        marginBottom: 20,
        marginRight: 20

    }
});


function ProfileItem({ profileType, attempt }) {

    const classes = useStyles();



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

    const displayTime = staticTime => {
        const getSeconds = `0${(staticTime % 60)}`.slice(-2);
        const minutes = `${Math.floor(staticTime / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(staticTime / 3600)}`.slice(-2);
        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }


    return (
        <>
            {
                profileType === 0
                    ?
                    <Grid item xs={12} className={classes.profileItem}>
                        <Paper style={{ marginLeft: 20 }}>
                            <Grid container justify="flex-start" alignItems="center">
                                <Grid item xs={5} sm={5}>
                                    <Typography variant="h6" align="left" style={{ marginLeft: 10 }}>
                                        {attempt.title}
                                    </Typography>
                                </Grid>

                                <Grid item xs={5} sm={6}>
                                    <Typography variant="h6" align="left" style={{ marginLeft: 10 }}>
                                        Completed in: {displayTime(attempt.timer)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sm={1}>
                                    <Tooltip title="Delete Progress">
                                        <IconButton
                                            color="inherit"
                                            aria-label="delete progress"
                                            onClick={deleteAttempt}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    :
                    profileType === 1
                        ?
                        <Grid item xs={12} className={classes.profileItem}>
                            <Paper style={{ marginLeft: 20 }}>
                                <Grid container justify="flex-start" alignItems="center">
                                    <Grid item xs={8} sm={10}>
                                        <Typography variant="h6" align="left" style={{ marginLeft: 10 }}>
                                            {attempt.title}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={2} sm={1}>
                                        <Tooltip title="Play This Puzzle">
                                            <IconButton
                                                color="inherit"
                                                aria-label="play puzzle"
                                                onClick={goPlay}
                                            >
                                                <ArrowRightAltIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={2} sm={1}>
                                        <Tooltip title="Delete This Puzzle">
                                            <IconButton
                                                color="inherit"
                                                aria-label="delete this puzzle"
                                                onClick={deleteRaw}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        :
                        <Grid item xs={12} className={classes.profileItem}>
                            <Paper style={{ marginLeft: 20 }}>
                                <Grid container justify="flex-start" alignItems="center">

                                    <Grid item xs={8} sm={10}>
                                        <Typography variant="h6" align="left" style={{ marginLeft: 10 }}>
                                            {attempt.title}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={2} sm={1}>
                                        <Tooltip title="Play This Puzzle">
                                            <IconButton
                                                color="inherit"
                                                aria-label="play puzzle"
                                                onClick={goPlay}
                                            >
                                                <ArrowRightAltIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item xs={2} sm={1}>
                                        <Tooltip title="Delete This Puzzle">
                                            <IconButton
                                                color="inherit"
                                                aria-label="delete progress"
                                                onClick={deleteAttempt}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
            }
        </>
    )
}

export default ProfileItem;