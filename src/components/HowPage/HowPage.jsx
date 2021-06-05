import React, { useState } from 'react';

import VClue from '../VClue/VClue';
import HClue from '../HClue/HClue';
import SampleGridElement from '../SampleGridElement/SampleGridElement'

function HowPage() {

  let [sampleFGrid, setSampleFGrid] = useState(
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  )
  let [sampleVGrid, setSampleVGrid] = useState(
    [
      [0, 0, 0, 0, 1],
      [0, 1, 0, 2, 1],
      [5, 1, 3, 1, 1]
    ]
  )
  let [sampleHGrid, setSampleHGrid] = useState(
    [
      [0, 0, 5],
      [0, 1, 2],
      [1, 1, 1],
      [0, 1, 1],
      [0, 2, 1]
    ]
  )
  let [sampleGrid, setSampleGrid] = useState(
    [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0],
      [1, 1, 0, 0, 1]
    ]
  )

  return (
    <div className="container">
      <p>How to play nonograms? </p>
      <p>Just do it.</p>

      <table className="playtable">
        <tbody>
          {sampleVGrid.map((array, i) =>
            <tr key={'tgrid' + i}>
              {sampleFGrid[i].map((value, j) =>
                <td key={i + 'fgrid' + j} className="filler">
                  {value ? value : ''}
                </td>
              )}
              {array.map((clue, j) =>
                <VClue key={'vclue' + j} clue={clue} />
                // <td key={i + 'vgrid' + j}>
                //   {value ? value : ''}
                // </td>
              )}
            </tr>
          )}

          {sampleHGrid.map((array, i) =>
            <tr key={'bgrid' + i}>
              {array.map((clue, j) =>
                <HClue key={'hclue' + j} clue={clue} />
                // <td key={i + 'hgrid' + j}>
                //   {value ? value : ''}
                // </td>
              )}
              {sampleGrid[i].map((value, j) =>
                <SampleGridElement key={i + 'grid' + j} value={value}/>
              )}
            </tr>
          )}


        </tbody>
      </table>

    </div>
  );
}

export default HowPage;
