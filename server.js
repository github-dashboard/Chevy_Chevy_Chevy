const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { filterRouter, cardsRouter } = require('./routes/index');
const { Logger } = require('./helpers/index');
const cors = require('cors');

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/', async (req, res, next) => {
  // middleware to validate the correct origin
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
  }
  Logger.log('info', `Middleware running: ${req.hostname}`);
  next();
});
// app.use(cors({origin: 'http://localhost:3000'})); 

app.use( '/', (req, res, next) => {
  // middleware to validate the correct origin
  Logger.log('info',`Middleware running: ${req.hostname}`)
  next();
});

app.use(filterRouter, cardsRouter);

app.set('host', process.env.HOST || 'http://localhost');
app.set('port', process.env.PORT || 9090);


app.listen(app.get('port'), () => {
  Logger.log('info',`App is running at ${app.get('host')}:${app.get('port')}`);
  console.log('info',`App is running at ${app.get('host')}:${app.get('port')}`);
});

module.exports = app;
