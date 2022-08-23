const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sammy',
  password : 'password',
  database: 'todos',
});

connection.connect();

app.get('/todos', (req, res) => {
  connection.query('SELECT * FROM todos', function(err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.post('/todos', (req, res) => {
  const { content, status } = req.body;
  connection.query(`INSERT INTO todos (content,status) VALUES ("${content}","${status}")`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.patch('/todos/:id', (req, res) => {
  if (req.body.hasOwnProperty('content')) {
    const { content } = req.body;
    connection.query(`UPDATE todos SET content = "${content}" WHERE id = ${req.params.id}`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
  }
  if (req.body.hasOwnProperty('status')) {
    const { status } = req.body;
    connection.query(`UPDATE todos SET status = "${status}" WHERE id = ${req.params.id}`, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  connection.query(`DELETE FROM todos WHERE id = ${req.params.id}`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// connection.end();