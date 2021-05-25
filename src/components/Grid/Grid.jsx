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
    }, [])

    function generateVertical(gridArray) {
        
    }

    

    return (
        <>
        {/* { gridData == undefined ? (<> </>):(JSON.stringify(gridData.tabledata)) } */}
        {/* { hData == [] ? (<> </>):(JSON.stringify(hData)) } */}
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