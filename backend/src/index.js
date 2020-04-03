const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(3333);