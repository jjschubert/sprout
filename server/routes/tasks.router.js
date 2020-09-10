const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');


//updates task due_date in the DB
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body)
  let queryText = `UPDATE "tasks"
  SET due_date = $1
  WHERE "tasks".id = $2 AND "tasks".user_id = $3; `;
  pool.query(queryText, [req.body.due_date, req.body.id, req.user.id])
  .then(result => {
    res.sendStatus(201)
  }).catch( error => {
    console.log('error in updateTask', error)
    res.sendStatus(500);
  })
})

//marks task complete in the DB
router.put('/complete/:id', rejectUnauthenticated, (req, res) => {
  console.log(req.params.id)
  let queryText = `UPDATE "tasks" 
  SET task_status = true
  WHERE "tasks".id = $1 AND "tasks".user_id = $2;`;

  pool.query(queryText, [req.params.id, req.user.id])
  .then((result) => {
    res.sendStatus(200);
}).catch((error) => {
    console.log("error in markComplete", error);
    res.sendStatus(500);
});
})

//gets details for a single plant, for details card
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in task details route')
  let queryText = `SELECT "tasks".due_date, "tasks".type_id FROM "tasks"
  WHERE "tasks".plant_id = $1
  ORDER BY "tasks".type_id ASC;`
  pool.query(queryText, [req.params.id]).then((result) => {
    res.send(result.rows);
}).catch((error) => {
    console.log("error in get details",error);
    res.sendStatus(500);
});
})


//gets all plants
router.get('/', rejectUnauthenticated, (req, res) => {
    
      console.log('/tasks GET route');      
      let queryText = `SELECT "tasks".plant_id, "tasks".type_id, "tasks".due_date, "tasks".task_status, "task_type".description, "plants".name, "tasks".id
      FROM "tasks" 
      JOIN "task_type" on "task_type".id = "tasks".type_id
      JOIN "plants" on "plants".id = "tasks".plant_id
      WHERE "tasks".user_id = $1;`;
      pool.query(queryText, [req.user.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
      });
    });

module.exports = router;