import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './GridElement.css';


function GridElement({ id, value, position }) {

    let [colorToggle, setColorToggle] = useState("colorWhite");
    let [newValue, setNewValue] = useState(value)

    const attempt = useSelector(store => store.attempt);
    const dispatch = useDispatch();

    useEffect(() => {
        setStartColor();
    }, [])

    function changeColor() {
        console.log('clicked grid space position of:', position );
        if (colorToggle === "colorWhite") {
            setColorToggle("colorGreen");
            setNewValue(1);
        } else if (colorToggle === "colorGreen") {
            setColorToggle("colorRed");
            setNewValue(2);
        } else {
            setColorToggle("colorWhite");
            setNewValue(0);
        }
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

export default GridElement;