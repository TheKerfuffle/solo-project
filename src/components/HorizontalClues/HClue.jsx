import { useState } from "react";

import './HClue.css';


function HClue({ clue }) {

    // let [colorToggle, setColorToggle] = useState("colorWhite");
    // 
    // function changeColor() {
    //     if (colorToggle === "colorWhite") {
    //         setColorToggle("colorGreen");
    //     } else if (colorToggle === "colorGreen") {
    //         setColorToggle("colorRed");
    //     } else {
    //         setColorToggle("colorWhite");
    //     }
    // }


    return (
        <>
            {clue === 0 ? (<td></td>) : (<td>{clue}</td>)}
        </>
    )
}

export default HClue;