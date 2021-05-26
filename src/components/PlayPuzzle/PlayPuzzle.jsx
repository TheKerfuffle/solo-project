import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './PlayPuzzle.css';

function PlayPuzzle() {
    

    const hGridData = useSelector(store => store.hGrid);
    const vGridData = useSelector(store => store.vGrid);

    return (
        <>

        </>
    )
}

export default PlayPuzzle;