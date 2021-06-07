const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET:id - gets a specific puzzle attempt - attempt
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "attempted_puzzles" WHERE player_id=$1 AND puzzle_id=$2;`, [req.user.id, req.params.id])
    .then((results) => {
      res.send(results.rows);
    }).catch(err => {
      res.sendStatus(500);
      console.log('Error in GET ATTEMPT', err);
    })
});

/**
 * GET - gets all of a user's attempts - userAttempts
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM attempted_puzzles as ap
    JOIN raw_puzzles as r ON r.id = ap.puzzle_id
    WHERE player_id=$1;`, [req.user.id])
    .then((results) => {
      res.send(results.rows);
    }).catch(err => {
      res.sendStatus(500);
      console.log('Error in GET ATTEMPT', err);
    })
});


/**
 * POST - ATTEMPT
 */
router.post('/', (req, res) => {
  const user = req.user.id;
  // console.log('user id', user);
  // console.log('post attempt req.body', req.body);
  const queryText = `INSERT INTO "attempted_puzzles" (player_id, puzzle_id, timer, input_data, completed)
    VALUES ($1, $2, $3, $4, $5)`;
  const queryValues = [
    req.body.player_id,
    req.body.puzzle_id,
    req.body.timer,
    req.body.input_data,
    req.body.completed
  ];

  pool.query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log('Error in POST ATTEMPT', error);
      res.sendStatus(500);
    })
});

/**
 * PUT - ATTEMPT
 */
router.put('/', (req, res) => {
  const user = req.user.id;
  // console.log('user id', user);
  // console.log('put attempt req.body', req.body);
  const queryText = `UPDATE attempted_puzzles 
  SET (timer, input_data, completed)=($1, $2, $3)
  WHERE "id"=$4;`;
  const queryValues = [
    req.body.timer,
    req.body.input_data,
    req.body.completed,
    req.body.id
  ];

  pool.query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log('Error in PUT ATTEMPT', error);
      res.sendStatus(500);
    })
});

/**
 * DELETE - ATTEMPT
 */

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'DELETE FROM attempted_puzzles WHERE puzzle_id=$1 AND player_id=$2;';
  pool.query(queryText, [req.params.id, req.user.id])
    .then(() => { res.sendStatus(200) })
    .catch((error) => {
      console.log('Error in DELETE attempt', error);
      res.sendStatus(500);
    });
});






module.exports = router;