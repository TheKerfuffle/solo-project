import { useState } from "react";

import './VClue.css';


function VClue({ clue }) {

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

export default VClue;