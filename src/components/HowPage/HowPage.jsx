import React, { useState } from 'react';

import VClue from '../VClue/VClue';
import HClue from '../HClue/HClue';
import SampleGridElement from '../SampleGridElement/SampleGridElement'

// MUI Core: 
import {
  Typography, IconButton,
  Grid, Tooltip
} from '@material-ui/core/';

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
      <Typography variant="h2" align="center" style={{ textDecoration: "underline", marginBottom: 20 }}>
        <p>How to play nonograms? </p>
      </Typography>

      <Typography
        variant="h4"
        align="center"
      >
        What do the colors of the squares mean?
      </Typography>

      <ul>
        <li>
          A White space means you don't know what is in that square.
        </li>
        <li>
          A Black space means you think that square is filled in.
        </li>
        <li>
          A Red space means you think that square is NOT filled in.
        </li>
      </ul>

      <Typography
        variant="h4"
        align="center"
      >
        Controls Please?
      </Typography>

      <ul>
        <li>
          Left clicking on a grid square will cycle the square through black, red and then back to white.
        </li>
        <li>
          Right clicking will mark the square as red or remove a red marking.
        </li>
        <li>
          The goal is to mark all the correct grid squares as black.
        </li>
      </ul>

      <Typography
        variant="h4"
        align="center"
      >
        What do those numbers on the top and side  mean?
      </Typography>

      <ul>
        <li>
          Those are clues! Those clues tell you what is in each row (horizontal) or column (vertical).
        </li>
        <li>
          The number corresponds to the amount of adjacent marked squares in the row/column
        </li>
        <li>
          SO... if we look below at the first column which has the clue: ( 5 ),
        </li>
        <li>
          WE KNOW there are 5 squares filled in below that clue
        </li>
        <li>
          AND... if we look at the bottom row which has the clue: ( 2, 1 ),
        </li>
        <li>
          WE KNOW there are 2 squares filled in with AT LEAST 1 unmarked square before another square is filled in
        </li>
      </ul>

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
                <SampleGridElement key={i + 'grid' + j} value={value} />
              )}
            </tr>
          )}


        </tbody>
      </table>

      <Typography
        variant="h4"
        align="center"
        style={{
          marginLeft: 40,
          marginRight: 40
        }}>
        Step by step guide to solve the puzzle above!
      </Typography>

      <ul>
        <li>
          First off we know that the grid is 5 by 5 which means we should look for clues that span an entire column or row.
        </li>
        <li>
          The First column and first row both are 5, which means we can fill both fully with black squares.
        </li>
        <li>
          We can also fill in the row and the column with the clue ( 1, 1, 1 )...
        </li>
        <li>
          because we know that there must be at least one space between each of the marked squares.
        </li>
        <li>
          Don't forget to mark unfilled spaces with your right click to keep track of them!
        </li>
        <li>
          We then can fill in the third square for the column with the ( 3 ) clue and mark the last 2 squares in the column as red.
        </li>
        <li>
          We now have enough information to complete the second row from the top as well as the last row.
        </li>
        <li>
          For the second row from the top, we know there must be a space between the 1 marked off square and the 2 marked off squares...
        </li>
        <li>
          ... So in the second position of this row we must place a red square, which tells us that the fourth position is filled in black.
        </li>
        <li>
          We also know that the first clue on the bottom row is a 2 so we can fill in the second position of this row and mark the fourth as red.
        </li>
        <li>
          This completes the second column as well, which allows us to mark the fourth position of this column as red,
        </li>
        <li>
          And we can now complete the puzzle since we know there must be a second filled in square in the fourth row!
        </li>
        <li>
          You did it!
        </li>
      </ul>

    </div>
  );
}

export default HowPage;
