import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


function PlayReRoute() {

    const solution = useSelector(store => store.solution);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_RANDOM_PUZZLE' });
        history.push(`/play/${solution.id}`);
    }, []);

    return (
        <>
            <h1>Finding a Random Puzzle JUST FOR YOU!</h1>
        </>
    )
}

export default PlayReRoute;