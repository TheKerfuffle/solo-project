const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET - GETS A RANDOM PUZZLE ID FROM DATABASE
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = "SELECT id FROM raw_puzzles ORDER BY RANDOM() LIMIT 1;"


  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows[0]);
    }).catch(err => {
      res.sendStatus(500);
      console.log('Error in GET /api/play', err);

    })

});

/**
 * GET:id
 */

// RETOOL FOR GET CREATED PUZZLES!!!
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = "SELECT * FROM raw_puzzles WHERE id=$1;"

  pool
    .query(queryText, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    }).catch(err => {
      res.sendStatus(500);
      console.log('Error in GET /api/play', err);

    })
});

/**
 * DELETE:id - deletes all attempts associated with a specific puzzle
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  queryText=`DELETE FROM attempted_puzzles WHERE puzzle_id=$1`;

  pool.query(queryText, [req.params.id])
  .then(() => { res.sendStatus(200) })
  .catch((error) => {
    console.log('Error in DELETE /api/puzzle', error);
    res.sendStatus(500);
  });
})

module.exports = router;