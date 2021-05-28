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
});

/**
 * POST route template
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
            console.log('Error in POST ATTEMPT', error);
            res.sendStatus(500);
        })
});


router.put('/', (req, res) => {
    const user = req.user.id;
    console.log('user id', user);
    console.log('post attempt req.body', req.body);




});
module.exports = router;