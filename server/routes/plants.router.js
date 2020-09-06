const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated, rejectNonAdmin
} = require('../modules/authentication-middleware');

//adds new plant to DB
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('got to plantPost', req.body)

  const insertPlant = `INSERT INTO "plants"("user_id", "name", "image_path", "notes")
  VALUES($1, $2, $3, $4)
  RETURNING "id"`


  pool.query(insertPlant, [req.user.id, req.body.plantName, req.body.imagePath, req.body.notes])
  .then(result => {
    console.log('result.rows', result.rows)
    console.log('New Plant Id:', result.rows[0].id)
    const createPlantId= result.rows[0].id;
    
    let taskQueryText;
    let queryValues;

    if (req.body.hardenOff && req.body.seedStart) {
      //sends all three task types
      taskQueryText = `INSERT INTO "tasks" ("plant_id", "user_id", "type_id", "due_date")
      VALUES ($1, $2, $3, $4),
      ($1, $2, $5, $6),
      ($1, $2, $7, $8);`;
      queryValues = [createPlantId, req.user.id, 3, req.body.plantOutdoors, 2, req.body.hardenOff, 1, req.body.seedStart]
      
    } else if (req.body.hardenOff) {
      //sends plantOutdoor task and hardenOff task
      taskQueryText = `INSERT INTO "tasks" ("plant_id", "user_id", "type_id", "due_date")
      VALUES ($1, $2, $3, $4),
      ($1, $2, $5, $6);`;
      queryValues = [createPlantId, req.user.id, 3, req.body.plantOutdoors, 2, req.body.hardenOff]

    } else if (req.body.seedStart) {
      //sends seedStart task and plantOutdoor task
      taskQueryText = `INSERT INTO "tasks" ("plant_id", "user_id", "type_id", "due_date")
      VALUES ($1, $2, $3, $4),
      ($1, $2, $5, $6);`;
      queryValues = [createPlantId, req.user.id, 3, req.body.plantOutdoors, 1, req.body.seedStart]

    } else {
      //sends plantOutdoor task, which is req'd on form
      taskQueryText = `INSERT INTO "tasks" ("plant_id", "user_id", "type_id", "due_date")
      VALUES ($1, $2, $3, $4);`;
      queryValues = [createPlantId, req.user.id, 3, req.body.plantOutdoors]
      
    }
    //second query makes tasks
    pool.query(taskQueryText, queryValues)
    .then( result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    })

    //catch for plant creation query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
})

 //gets all plants
router.get('/', (req, res) => {
if(req.isAuthenticated()) {
  console.log('/plants GET route');
  console.log('Is User logged in?', req.isAuthenticated());
  console.log('user info', req.user)//req.user is a reflection of user table
  
  let queryText = `SELECT * FROM "plants" WHERE "user_id" = $1
  ORDER BY "plants".id ASC`;
  pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
} else {
  res.sendStatus(403);
}
});

//gets one plant
router.get('/:id', rejectUnauthenticated, (req, res) => {
      console.log('/plants/details');
  
      
      let queryText = `SELECT "plants".user_id, "plants".id, "plants".name, "plants".image_path, "plants".notes, "plants".last_fertilize, "plants".last_water, "tasks".due_date, "tasks".type_id, "task_type".description
      FROM "plants"
      INNER JOIN "tasks" on "tasks".plant_id = "plants".id
      INNER JOIN "task_type" on "task_type".id = "tasks".type_id
      WHERE "plants".id = $1;`;
      pool.query(queryText, [req.params.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log("error in get details",error);
          res.sendStatus(500);
      });
   
    });

module.exports = router;