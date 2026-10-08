const express = require('express');
const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = require('./database');
const routes = require('./routes')(db);
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
