const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./db/db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, data) => {
    res.json(data.rows);
  });
});

app.post('/api/users', (req, res) => {
  db.query(`INSERT INTO users(email,username,password) VALUES('${req.body.email}','${req.body.username}','${req.body.password}')`, err => {
    if (err) console.log(err);
  });
});

app.get('/api/stories', (req, res) => {
  db.query('SELECT * FROM stories,users WHERE users.id=stories.user_id', (err, data) => {
    res.json(data.rows);
  });
});

app.post('/api/stories', (req, res) => {
  let userId = null;
  db.query(`SELECT id FROM users WHERE username='${req.body.author}'`, (err, data) => {
    userId = data.rows[0].id;
    db.query(`INSERT INTO stories(title,text,time,latitude,longitude,categories,user_id)
      VALUES('${req.body.title}','${req.body.text}','${req.body.time}','${req.body.latitude}','${req.body.longitude}','${JSON.stringify(req.body.categories)}','${userId}')`, err => {
        if (err) console.log(err);
      });
    });
});

app.listen(port, () => console.log(`Listening at port ${port}`));
