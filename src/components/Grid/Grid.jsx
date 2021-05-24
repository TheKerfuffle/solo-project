import { useEffect, useState } from 'react';
import GridElement from '../GridElement/GridElement'
import './Grid.css';

function Grid(props) {

    let [gridData, setGridData] = useState([])

    useEffect(() => {
        setGridData(
        [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [10, 21, 22, 23, 24]
        ]
        );
    }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            1
                        </th>
                        <th>
                            2
                        </th>
                        <th>
                            3
                        </th>
                        <th>
                            4
                        </th>
                        <th>
                            5
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {gridData.map((item, i) => (
                            <tr key={i}>

                            {
                                item.map((thing, j) => (
                                    <GridElement key={j} id={j} thing={thing}/>
                                ))
                            }
                            </tr>
                            

                        ))}
                </tbody>
            </table>
        </>
    )
}

export default Grid;

// { JSON.stringify(gridData) }