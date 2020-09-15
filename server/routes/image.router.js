const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})





module.exports = router;