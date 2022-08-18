const express = require('express');

const app = express();
const PORT = 5003;

app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));

const taskRouter = require('./routes/task.router.js');
app.use('/task', taskRouter);

app.listen(PORT, () => {
console.log('listening on port', PORT)
});