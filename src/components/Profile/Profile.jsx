import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from '../ProfileItem/ProfileItem';


function Profile() {

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const userAttempts = useSelector(store => store.userAttempts);

    useEffect(() => {
        dispatch({ type: 'GET_USER_ATTEMPTS', payload: user.id });
    }, []);


    return (
        <>
            <h3>Profile View</h3>

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
            <ul>

                {
                    userAttempts.length === 0
                        ?
                        ('')
                        :
                        userAttempts.map((attempt, i) =>
                            attempt.creator_id === user.id
                                ?
                                <ProfileItem key={i} profileType={1} attempt={attempt} />
                                :
                                ''
                        )
                }
            </ul>

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