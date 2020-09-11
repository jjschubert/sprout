const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated, rejectNonAdmin
} = require('../modules/authentication-middleware');

//gets tasks organized into obj form
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/tasks/obj')
    let queryText = `SELECT "tasks".plant_id, json_agg(json_build_object('due_date', tasks.due_date, 'type_id', tasks.type_id, 'plantname', plants.name)) AS "plantTasks"
    FROM "tasks" 
    JOIN "task_type" on "task_type".id = "tasks".type_id
    JOIN "plants" on "tasks".plant_id = "plants".id
    WHERE "tasks"."user_id" = $1
    GROUP BY "tasks".plant_id;`
    pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
  })

  module.exports = router;