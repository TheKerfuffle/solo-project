import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridElement from '../GridElement/GridElement'
import HClue from '../HClue/HClue';
import VClue from '../VClue/VClue';
import './Grid.css';

function Grid() {

    // let [gridData, setGridData] = useState([])

    const dispatch = useDispatch();

    const gridData = useSelector(store => store.grid);
    const hGridData = useSelector(store => store.hGrid);
    const vGridData = useSelector(store => store.vGrid);


    useEffect(() => {
        dispatch({ type: 'GET_GRID' });
    }, [])

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

                    { vGridData.length == undefined ? 
                    (
                        <>
                        </>
                    ) 
                    : 
                    (
                        vGridData.tableData.map((item,i) => (
                            <tr key={i}>

                            {item.map((clue,j) => (
                                <VClue key={j} clue={clue} />
                            ))}
                            </tr>
                        ))
                    )
                    }

                    { gridData.id == undefined ?
                        (
                            <>

                            </>
                        )
                        :
                        (
                            gridData.tabledata.map((item, i) => (
                                <>
                                    <tr key={i}>
                                        {
                                            hGridData.tableData[i].map((clue, k) => (
                                                <HClue key={k} clue={clue} />
                                            ))
                                        }

                                        {
                                            item.map((thing, j) => (
                                                <GridElement key={j} id={j} thing={thing} />
                                            ))
                                        }
                                    </tr>
                                </>

                            ))
                        )
                    }


                </tbody>
            </table>
        </>
    )
}

export default Grid;

// { JSON.stringify(gridData) }