const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;