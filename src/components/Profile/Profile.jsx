import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from '../ProfileItem/ProfileItem';

// Custom Styles/Themes
import { makeStyles, useTheme } from '@material-ui/core/styles';

// MUI Core: 
import {
    Paper, Typography, List,
    Toolbar, AppBar, CssBaseline,
    Drawer, Button, IconButton,
    Divider, Grid
} from '@material-ui/core/';

const useStyles = makeStyles({
    menuBtn: {
        marginTop: 20,
        marginLeft: 20,

    },
    profileContainer: {

    }
});


function Profile() {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const userAttempts = useSelector(store => store.userAttempts);
    const userPuzzles = useSelector(store => store.userPuzzles);

    useEffect(() => {
        dispatch({ type: 'GET_USER_ATTEMPTS' });
        dispatch({ type: 'GET_USER_PUZZLES' });
    }, []);


    return (
        <>
            <Typography
                variant="h2"
                style={{ textAlign: "center", textDecoration: "underline", marginBottom: 40 }}
            >
                {user.username}'s Profile
            </Typography>

            <Grid container >
                {
                    userAttempts.length === 0
                        ?
                        ('')
                        :
                        <>
                            <Typography
                                variant="h3"
                                style={{ marginLeft: 20, marginBottom: 20 }}
                            >
                                Completed Puzzles
                            </Typography>
                            {userAttempts.map((attempt, i) =>
                                attempt.completed
                                    ?
                                    <ProfileItem key={i} profileType={0} attempt={attempt} />
                                    :
                                    ''
                            )}
                        </>
                }
            </Grid>

            <Grid container >
                {
                    userPuzzles.length === 0
                        ?
                        ('')
                        :
                        <>
                            <Typography
                                variant="h3"
                                style={{ marginLeft: 20, marginBottom: 20 }}
                            >
                                Created Puzzles
                            </Typography>
                            {userPuzzles.map((attempt, i) =>
                                attempt.creator_id === user.id
                                    ?
                                    <ProfileItem key={i} profileType={1} attempt={attempt} />
                                    :
                                    ''
                            )}
                        </>
                }
            </Grid>

            <Grid container >
                {
                    userAttempts.length === 0
                        ?
                        ('')
                        :
                        <>
                            <Typography
                                variant="h3"
                                style={{ marginLeft: 20, marginBottom: 20 }}
                            >
                                Saved Attempts
                            </Typography>
                            {userAttempts.map((attempt, i) =>
                                !attempt.completed
                                    ?
                                    <ProfileItem key={i} profileType={2} attempt={attempt} />
                                    :
                                    ''
                            )}
                        </>
                }
            </Grid>


        </>
    )
}

export default Profile;