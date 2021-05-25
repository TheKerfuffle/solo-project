import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridElement from '../GridElement/GridElement'
import HClue from '../HClue/HClue';
import './Grid.css';

function Grid() {

    // let [gridData, setGridData] = useState([])

    const dispatch = useDispatch();

    const gridData = useSelector(store => store.grid);
    const hGridData = useSelector(store => store.hGrid);

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


                    {gridData.id == undefined ?
                        (
                            <>

                            </>
                        )
                        :
                        (
                            gridData.tabledata.map((item, i) => (
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