import { useState } from "react";

import './GridElement.css';


function GridElement({id, thing}) {

    let [colorToggle, setColorToggle] = useState("colorWhite");

    function changeColor() {
        if (colorToggle === "colorWhite") {
            setColorToggle("colorGreen");
        } else if (colorToggle === "colorGreen") {
            setColorToggle("colorRed");
        } else {
            setColorToggle("colorWhite");
        }
    }
    

    return (
        <td className={colorToggle} onClick={changeColor}>
            {thing}
        </td>
    )
}

export default GridElement;