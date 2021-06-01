const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET - Gets a specific user's created puzzles for their profile
 */
router.get('/', rejectUnauthenticated,(req, res) => {
    user = req.user.id
    const queryText = `SELECT * FROM raw_puzzles WHERE creator_id=$1`;
    // GET route code here

    pool.query(queryText, [user])
    .then((results) => {
        res.send(results.rows);
      }).catch(err => {
        res.sendStatus(500);
        console.log('Error in GET /api/puzzle', err);
      })
});

/**
 * POST
 */
router.post('/', (req, res) => {
    // POST route code here
    const queryText = `INSERT INTO raw_puzzles (title, solution_data, creator_id)
      VALUES ($1, $2, $3)`;
    const queryValues = [
        req.body.title,
        req.body.solution_data,
        req.body.creator_id
    ];
    pool.query(queryText, queryValues)
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('Error in POST /api/puzzle', error);
            res.sendStatus(500);
        })
});

/**
 * PUT
 */
router.put('/', (req, res) => {
    const user = req.user.id;
    console.log('user id', user);
    console.log('post attempt req.body', req.body);




});

/**
 * DELETE
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const user = req.user.id;
    queryText=`DELETE FROM raw_puzzles WHERE id=$1;`;

    pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200) })
    .catch((error) => {
      console.log('Error in DELETE /api/puzzle', error);
      res.sendStatus(500);
    });
})
module.exports = router;