const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated, rejectNonAdmin
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */

 // need a way to protect this route (anytime you're using req.user is a good rule of thumb)
 //gets all plants
router.get('/', (req, res) => {
if(req.isAuthenticated()) {
  console.log('/plants GET route');
  console.log('Is User logged in?', req.isAuthenticated());
  console.log('user info', req.user)//req.user is a reflection of user table
  
  let queryText = `SELECT * FROM "plants" WHERE "user_id" = $1`;
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
  
      
      let queryText = `SELECT * FROM "plants" WHERE "id" = $1`;
      pool.query(queryText, [req.params.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log("error in get details",error);
          res.sendStatus(500);
      });
   
    });

module.exports = router;