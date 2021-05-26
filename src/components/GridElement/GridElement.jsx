import { useEffect, useState } from "react";

import './GridElement.css';


function GridElement({ id, value, position }) {

    let [colorToggle, setColorToggle] = useState("colorWhite");

    useEffect(() => {
        setStartColor();
    }, [])

    function changeColor() {
        console.log('clicked grid space position of:', position );
        if (colorToggle === "colorWhite") {
            setColorToggle("colorGreen");
        } else if (colorToggle === "colorGreen") {
            setColorToggle("colorRed");
        } else {
            setColorToggle("colorWhite");
        }
    }

    function setStartColor() {
        switch (value) {
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