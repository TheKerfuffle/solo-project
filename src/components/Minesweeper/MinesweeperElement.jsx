import { useState } from "react";



function MinesweeperElement({ underlay, element, reveal, y, x }) {

    function revealElement() {
        console.log('logging overlay click, underlay value, y, x', underlay[y][x], y, x);
        underlay[y][x] = { value: element, reveal: true };
    }


    return (
        <>
            {reveal ? (
                // Underlay
                <td>{element}</td>
            ) : (
                // Overlay
                <td onClick={revealElement}></td>
            )}
        </>

    )
}

export default MinesweeperElement;