const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
    
      console.log('/tasks GET route');      
      let queryText = `SELECT "tasks".plant_id, "tasks".type_id, "tasks".due_date, "tasks".task_status, "task_type".description
      FROM "tasks" 
      JOIN "task_type" on "task_type".id = "tasks".type_id
      WHERE "user_id" = $1;`;
      pool.query(queryText, [req.user.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
      });
    });

module.exports = router;