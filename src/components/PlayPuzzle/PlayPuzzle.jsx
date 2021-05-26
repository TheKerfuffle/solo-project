import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GridElement from '../GridElement/GridElement';
import HClue from '../HClue/HClue';
import VClue from '../VClue/VClue';
import './PlayPuzzle.css';



function PlayPuzzle() {


    const hGridData = useSelector(store => store.hGrid);
    const vGridData = useSelector(store => store.vGrid);
    const attempt = useSelector(store => store.attempt);

    return (
        <>
            {/* { gridData == undefined ? (<> </>):(JSON.stringify(gridData.tabledata)) } */}
            {/* { hData == [] ? (<> </>):(JSON.stringify(hData)) } */}
            <table>
                <tbody>

                    {vGridData.length == undefined ?
                        (
                            <>
                            </>
                        )
                        :
                        (

                            vGridData.tableData.map((item, i) => (
                                <tr key={i}>
                                    {hGridData.fillerGrid.map(() => (
                                        <td className="filler"></td>
                                    ))}

                                    {item.map((clue, j) => (
                                        <VClue key={j} clue={clue} />
                                    ))}
                                </tr>
                            ))
                        )
                    }

                    {attempt == {} ?
                        (
                            <>

                            </>
                        )
                        :
                        (
                            attempt.input_data.map((item, i) => (
                                <>
                                    <tr key={i}>
                                        {/* In each row, the clues come first, which have 
                                            already been processed to the format we need */}
                                        {
                                            hGridData.tableData[i].map((clue, k) => (
                                                <HClue key={k} clue={clue} />
                                            ))
                                        }

                                        {
                                            item.map((value, j) => (
                                                <GridElement key={j} id={j} value={value} position={[i,j]} />
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

export default PlayPuzzle;