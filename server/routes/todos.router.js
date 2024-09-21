const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos"' ;
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting books', error);
      res.sendStatus(500);
    });
  });


  router.post('/',  (req, res) => {
    let newItem = req.body;
    console.log(`Adding item`,newItem);
  
    let queryText = `INSERT INTO "todos" ("text","isComplete")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newItem.text,newItem.isComplete])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new item`, error);
        res.sendStatus(500);
      });
  });

  router.delete('/:id', (req, res) => {
    // NOTE: This route is incomplete.
    console.log('req.params', req.params.id);
    let id = req.params.id
  
    let sqlText = `DELETE FROM "todos" WHERE "id" = $1`
    let params = [id];
  
    pool.query(sqlText, params).then( result => {
        res.sendStatus(204);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
  
  });
  



module.exports = router;
