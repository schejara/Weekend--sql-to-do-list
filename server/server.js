const express = require('express');
const app = express();

const todos = require('./routes/todos.router.js');


require('dotenv').config()


// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.static('./server/public'));
app.use(express.json());

app.use('/todos', todos);

const PORT = process.env.PORT || 5001;
app.listen( PORT, () => {
  console.log( 'Listening on port', PORT );
})