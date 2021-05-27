import { useState } from "react"


function AddPuzzle() {

    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(0);
    let [gridData, setGridData] = useState([]);

    function generateGrid() {
        
    }


    return (
        <>
            <input
                value={width}
                label="width"
                type="number"
                onChange={(e) => setWidth(e.target.value)}
            />
            {width === 0 ?
                ''
                :
                <input
                    value={height}
                    label="height"
                    type="number"
                    onChange={(e) => setHeight(e.target.value)}
                />
            }

            {height === 0 ?
                ''
                :
                <button onClick={generateGrid}>Generate Grid</button>
            }
        </>
    )
}

export default AddPuzzle;