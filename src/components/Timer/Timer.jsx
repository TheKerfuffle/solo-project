import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function Timer() {

    let timerReducer = useSelector(store=> store.timer);
    let [time, setTime]  = useState(timerReducer);
    const dispatch = useDispatch();
    // let [toggleRunning, setToggleRunning] = useState(false);
    const countRef = useRef(null);

    function startTimer() {
        // setToggleRunning(true);
        countRef.current = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000);
    }

    function stopTimer() {
        clearInterval(countRef.current);
        dispatch({type: 'SET_TIMER', payload: time});
        // setToggleRunning(false)
    }

    function resetTimer() {
        setTime(0);
        dispatch({type: 'SET_TIMER', payload: 0});
        // setToggleRunning(false);
    }

    function saveTimer() {
        dispatch({type: 'SET_TIMER', payload: time});
    }

    const renderTime = () => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }

    return (
        <>
            <h3>REDUCER TIMER</h3>
            <h3>{renderTime()}</h3>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
            <button onClick={saveTimer}>Save</button>
        </>
    )
}

export default Timer;