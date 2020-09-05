const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated
  } = require('../modules/authentication-middleware');


router.put('/', rejectUnauthenticated, (req, res) => {
        console.log('/fertilize put route');
        let queryText = `UPDATE "plants"
        SET "last_fertilize" = current_timestamp
        WHERE "id" = $1;`;
        pool.query(queryText, [req.body.id]).then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    
      });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
