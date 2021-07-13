import { useEffect } from "react";
import { useState } from "react";



function MinesweeperElement({ underlay, element, reveal, y, x }) {

    const [revealMirror, setRevealMirror] = useState(reveal);

    function revealElement() {
        underlay[y][x] = { value: element, reveal: true };
        // setRevealMirror(true);
        console.log('logging overlay click, underlay value, y, x', underlay[y][x], y, x);
    }

    useEffect(() => {
        if (underlay[y][x].reveal === true) {
            setRevealMirror(true);
        }
    }, [underlay])


    return (
        <>
            {revealMirror ? (
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