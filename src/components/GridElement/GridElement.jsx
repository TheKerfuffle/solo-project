import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './GridElement.css';


function GridElement({ id, value, position, time }) {

    let [colorToggle, setColorToggle] = useState("colorWhite");

    const attempt = useSelector(store => store.attempt);
    const attemptData = attempt.input_data;
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setStartColor();
    }, [])

    function changeColor(e) {
        // console.log('clicked grid space position of:', position);
        let val;

        if (e.button === 0) {
            if (colorToggle === "colorWhite") {
                setColorToggle("colorBlack");
                val = 1;
            } else if (colorToggle === "colorBlack") {
                setColorToggle("colorRed");
                val = 2;
            } else {
                setColorToggle("colorWhite");
                val = 0;
            }
        } else {
            e.preventDefault();
            if (colorToggle === "colorWhite") {
                setColorToggle("colorRed");
                val = 2;
            } else if (colorToggle === "colorBlack") {
                setColorToggle("colorRed");
                val = 2;
            } else {
                setColorToggle("colorWhite");
                val = 0;
            }
        }


        attemptData[position[0]][position[1]] = val;

        if (attempt.id === 0) {
            dispatch({
                type: 'SET_ATTEMPT', payload: {
                    id: 0,
                    player_id: user.id,
                    puzzle_id: attempt.puzzle_id,
                    timer: time,
                    input_data: attemptData,
                    completed: attempt.completed
                }
            });
        } else {
            dispatch({
                type: 'SET_ATTEMPT', payload: {
                    id: attempt.id,
                    player_id: user.id,
                    puzzle_id: attempt.puzzle_id,
                    timer: time,
                    input_data: attemptData,
                    completed: attempt.completed
                }
            });

        }



    }

    function setStartColor() {
        switch (value) {
            case 0:
                return setColorToggle("colorWhite");
            case 1:
                return setColorToggle("colorBlack");
            case 2:
                return setColorToggle("colorRed");
        }
    }


    return (


        <td className={colorToggle}
            onClick={event => changeColor(event)}
            onContextMenu={(event) => changeColor(event)}>
        </td>
    )
}

export default GridElement;