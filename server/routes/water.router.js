const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated
  } = require('../modules/authentication-middleware');


router.put('/', rejectUnauthenticated, (req, res) => {
        console.log('/water put route');
        let queryText = `UPDATE "plants"
        SET "last_water" = current_timestamp
        WHERE "id" = $1 AND "plants".user_id = $2;`;
        pool.query(queryText, [req.body.id, req.user.id]).then((result) => {
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
