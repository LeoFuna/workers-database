const express = require('express');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const onError = require('./middlewares/onError');

const app = express();

app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRouter);
app.use('/user', userRouter);

app.use(onError);

const PORT = 3000;
app.listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});

module.exports = app;
