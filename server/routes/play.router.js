const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = "SELECT * FROM raw_puzzles;"


  pool
    .query(queryText)
    .then((results) => {
      res.send(results.rows);
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
  const queryText = "SELECT * FROM raw_puzzles WHERE player_id=$1;"

  pool
    .query(queryText, [req.params.id])
    .then((results) => {
      res.send(results.rows);
    }).catch(err => {
      res.sendStatus(500);
      console.log('Error in GET /api/play', err);

    })
});

module.exports = router;