import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './NewPuzzleItem.css';


function NewPuzzleItem({ value, position, title }) {

    let [colorToggle, setColorToggle] = useState("colorWhite");
    let [newValue, setNewValue] = useState(value);

    const newPuzzle = useSelector(store => store.newPuzzle);
    const newPuzzleData = newPuzzle.solution_data;
    const dispatch = useDispatch();

    useEffect(() => {
        setStartColor();
    }, [])

    function changeColor() {
        // console.log('clicked grid space position of:', position);
        let val;

        if (colorToggle === "colorWhite") {
            setColorToggle("colorGreen");
            setNewValue(1);
            val = 1;
        } else if (colorToggle === "colorGreen") {
            setColorToggle("colorRed");
            setNewValue(2);
            val = 2;
        } else {
            setColorToggle("colorWhite");
            setNewValue(0);
            val = 0;
        }

        newPuzzleData[position[0]][position[1]] = val;
        
        console.log(newPuzzleData);

        dispatch({type: 'SET_NEW_PUZZLE', payload: {
            creator_id: newPuzzle.creator_id,
            solution_data: newPuzzleData,
            title: newPuzzle.title,
            height: newPuzzle.height,
            width: newPuzzle.width
        }});
    }

    function setStartColor() {
        switch (newValue) {
            case 0:
                return setColorToggle("colorWhite");
            case 1:
                return setColorToggle("colorGreen");
            case 2:
                return setColorToggle("colorRed");
        }
    }


    return (


        <td className={colorToggle} onClick={changeColor}>

        </td>
    )
}

export default NewPuzzleItem;