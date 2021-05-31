import { useState } from "react";

import './HClue.css';


function HClue({ clue }) {

    let [classThing, setClassThing] = useState("horiClue");

    function toggleClue() {
        if (classThing === "horiClue") {
            setClassThing("horiClue clueToggle");
        } else {
            setClassThing("horiClue");
        }
    }

    return (
        <>
            {
                clue === 0 ?
                    (<td className={classThing}></td>)
                    :
                    (<td className={classThing} onClick={toggleClue}>{clue}</td>)
            }
        </>
    )
}

export default HClue;