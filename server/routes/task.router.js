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
    const tasks = req.body;
    console.log('data from client', tasks);
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

router.delete('/:id', (req, res) => {
    const queryText ='DELETE FROM "tasks" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in Task Delete', error);
        res.sendStatus(500);
    })
})
 //put
 router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log(req.body);
    //const queryText = `UPDATE "task" SET "votes" = "votes" + 1 WHERE "id" = $1;`;
    pool.query(queryText, [taskId]).then((results) => {
        res.sendStatus(200);
 }).catch((error) => {
    console.log('Error in Put task', error);
    res.sendStatus(500);
 });
});

module.exports = router;