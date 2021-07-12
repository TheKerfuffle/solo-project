import { useState } from "react";



function MinesweeperElement({ element, i, j}) {

    const [reveal, setReveal] = useState(false);
    

    return(
        <>
            {reveal ? (
                <td>{element}</td>
            ):(
                <td></td>
            )}
        </>

    )
}

export default MinesweeperElement;