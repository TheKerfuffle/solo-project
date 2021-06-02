import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";


function ProfileItem({ profileType, attempt }) {

    const dispatch = useDispatch();
    const history = useHistory();

    function deleteAttempt () {
        dispatch({type: 'DELETE_ATTEMPT', payload: {
            id: attempt.puzzle_id,
            title: attempt.title,
            solution_data: attempt.solution_data,
            creator_id: attempt.creator_id
        }})
        history.push('/profile');
    }

    function deleteRaw() {
        dispatch({type: 'DELETE_RAW_PUZZLE', payload: attempt})
    }

    function goPlay() {
        dispatch({ type: 'RESET_SOLUTION' });
        dispatch({ type: 'RESET_ATTEMPT' });
        dispatch({ type: 'RESET_V_GRID' });
        dispatch({ type: 'RESET_H_GRID' });
        history.push(`/play/${attempt.id}`)
    }


    return (
        <>
            {
                profileType === 0
                    ?
                    <li>
                        {attempt.title}, Completed in: {attempt.timer}
                        <button onClick={deleteAttempt}>Delete</button>
                    </li>
                    :
                    profileType === 1
                        ?
                        <li>
                            {attempt.title}
                            <button onClick={deleteRaw}>Delete</button>
                        </li>
                        :
                        <li>
                            {attempt.title}
                            <button onClick={goPlay}>Continue</button>
                            <button onClick={deleteAttempt}>Delete</button>
                        </li>
            }
        </>
    )
}

export default ProfileItem;