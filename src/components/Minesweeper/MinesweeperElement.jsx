import { useState } from "react";



function MinesweeperElement({ underlay, element, reveal, y, x }) {

    function revealElement() {
        
    }


    return (
        <>
            {reveal ? (
                <td>{element}</td>
            ) : (
                <td onClick={revealElement}></td>
            )}
        </>

    )
}

export default MinesweeperElement;