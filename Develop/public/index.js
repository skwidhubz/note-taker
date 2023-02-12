const express = require('express');

const app = express();

app.use('/api', apiRouter)


module.exports = app;
