const express = require('express');

module.exports = function(db) {
  const router = express.Router();

  router.post('/add', (req, res) => {
    const username = req.body.username;
    db.query('INSERT INTO contacts (name) VALUES (?)', [username], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }
      res.redirect('/');
    });
  });

  router.get('/contacts', (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }
      res.json(results);
    });
  });

  return router;
};
