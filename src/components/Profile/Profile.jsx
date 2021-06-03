import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from '../ProfileItem/ProfileItem';

// Custom Styles/Themes
import { makeStyles, useTheme } from '@material-ui/core/styles';

// MUI Core: 
import { Paper, Typography, List, 
    Toolbar, AppBar, CssBaseline, 
    Drawer , Button, IconButton, 
    Divider} from '@material-ui/core/';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CasinoIcon from '@material-ui/icons/Casino';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 60;

const useStyles = makeStyles({
    menuBtn: {
        marginTop: 20,
        marginLeft: 20,

    },
    hover: {
        '&:hover': {
            backgroundColor: 'green',
        }
    }
});


function Profile() {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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

            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={classes.menuBtn}
            >
                <MenuIcon />
            </IconButton>



            <Typography 
                variant="h2"
                
                >
                Profile View
            </Typography>

            <h3>Completed Puzzles</h3>

            <ul>
                {
                    userAttempts.length === 0
                        ?
                        ('')
                        :
                        userAttempts.map((attempt, i) =>
                            attempt.completed
                                ?
                                <ProfileItem key={i} profileType={0} attempt={attempt} />
                                :
                                ''
                        )
                }
            </ul>

            <h3>Created Puzzles</h3>


                {
                    userPuzzles.length === 0
                        ?
                        ('')
                        :
                        userPuzzles.map((attempt, i) =>
                            attempt.creator_id === user.id
                                ?
                                <ProfileItem key={i} profileType={1} attempt={attempt} />
                                :
                                ''
                        )
                }


            <h3>Saved Attempts</h3>

            <ul>
                {
                    userAttempts.length === 0
                        ?
                        ('')
                        :

                        userAttempts.map((attempt, i) =>
                            !attempt.completed
                                ?
                                <ProfileItem key={i} profileType={2} attempt={attempt} />
                                :
                                ''
                        )
                }
            </ul>


        </>
    )
}

export default Profile;