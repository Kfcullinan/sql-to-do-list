const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const pool = require('../modules/pool.js');


router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "tasks";'; 
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const task = req.body;
    const queryText = `INSERT INTO "tasks" ("task", "completed")
                                    VALUES ($1, $2);`  
    pool.query(queryText, [tasks.task, tasks.completed])
    .then((results) => {
        console.log(results);
        res.send(results);

    })
     .catch((error) => {
        console.log('Error in POST /tasks', error);
        res.sendStatus(500);
     });                                  
});




module.exports = router;