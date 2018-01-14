const express = require('express');

const { memoryRouter } = require('./server/services/memory/router');
const { diskRouter } = require('./server/services/disk/router');
const { cpuRouter } = require('./server/services/cpu/router');
const { tasksRouter } = require('./server/services/tasks/router');

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.use('/memory', memoryRouter);
app.use('/disk', diskRouter);
app.use('/cpu', cpuRouter);
app.use('/tasks', tasksRouter);

app.listen(3000, () => {
    console.log(`Access > localhost:3000`);
});

    