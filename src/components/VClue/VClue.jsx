import { useState } from "react";

import './VClue.css';


function VClue({ clue }) {

    let [classThing, setClassThing] = useState("vertClue");

    function toggleClue() {
        if (classThing === "vertClue") {
            setClassThing("vertClue clueToggle");
        } else {
            setClassThing("vertClue");
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

export default VClue;