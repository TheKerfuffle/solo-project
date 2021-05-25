import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridElement from '../GridElement/GridElement'
import './Grid.css';

function Grid(props) {

    // let [gridData, setGridData] = useState([])
    let [vData, setVData] = useState([]);
    let [hData, setHData] = useState([]);
    let [rowClue, setRowClue] = useState([0])

    const dispatch = useDispatch();

    const gridData = useSelector(store => store.grid);

    useEffect(() => {
        dispatch({type: 'GET_GRID'});
        generateHorizontal(gridData);
    }, [hData])

    function generateVertical(gridArray) {
        
    }

    function generateHorizontal(gridArray) {
        let newRow = [];
        let newClue = 0;
        // Loop through i which denotes which row we are working with
        for (let i=0; i<gridArray.length; i++) {
            console.log(' in generate H i ', i);

            // Loop through j which denotes which element of the row we are working with
            for (let j=0; j<gridArray[i].length; j++) {
                console.log(' in generate H j', j);
                if (gridArray[i][j] === 1) {
                    newClue++;
                } else if ( gridArray[i][j] === 0 && newClue > 0) {
                    newRow.push(newClue);
                    newClue = 0;
                }
            }

            if (newClue > 0) {
                newRow.push(newClue);
                newClue = 0;
            }
            setHData(...hData, newRow);
            newRow =[];
        }
    }

    return (
        <>
        {/* { gridData == undefined ? (<> </>):(JSON.stringify(gridData.tabledata)) } */}
        { hData == [] ? (<> </>):(JSON.stringify(hData)) }
            <table>
                <thead>
                    <tr>
                        
                    </tr>
                </thead>
                <tbody>

                
                    { gridData == undefined ? (
                        <>

                        </>
                    ):(
                        gridData.tabledata.map((item, i) => (
                            <tr key={i}>
                                {
                                    item.map((thing, j) => (
                                        <HorizontalClues key={j} id={j} thing={thing} />
                                    ))
                                }
    
                                {
                                    item.map((thing, j) => (
                                        <GridElement key={j} id={j} thing={thing} />
                                    ))
                                }
                            </tr>
    
    
                        ))
                    )}

                    
                </tbody>
            </table>
        </>
    )
}

export default Grid;

// { JSON.stringify(gridData) }