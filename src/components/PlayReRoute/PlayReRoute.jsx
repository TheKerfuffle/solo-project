import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";


function PlayReRoute() {
    // THIS PAGE IS NOT USED IN THE FINAL PROJECT, 
    // IT HAS BEEN LEFT FOR THOSE WHO WISH TO SEE THE PROCESS
    // OF MAKING IT OBSELETE IN THIS PROJECT

    let solution = useSelector(store => store.solution);
    let randID = useSelector(store => store.randomPuzzleID);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_RANDOM_PUZZLE' });

        console.log('in useEffect on reroute, solution:', solution);
        console.log('in useEffect on reroute, randID:', randID);
        if (randID > 0) {
            history.push(`/play/${randID}`);
        }
    }, []);

    return (
        <>
            <h1>Finding a Random Puzzle...</h1>
        </>
    )
}

export default PlayReRoute;