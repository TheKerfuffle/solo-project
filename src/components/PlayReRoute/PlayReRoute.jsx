import { useEffect } from "react";
import { useDispatch } from "react-redux";


function PlayReRoute() {

    const dispatch = useDispatch();
    
    useEffect(()=> {
        dispatch({type: 'GET_RANDOM_PUZZLE'})
    }, [])

    return (
        <>

        </>
    )
}

export default PlayReRoute;