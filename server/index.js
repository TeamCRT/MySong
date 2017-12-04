const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const api = require('./api');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../env.env' });
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const app = express();
// app.use(app.router);
app.use(express.static(path.join(__dirname, '../client/build')));
console.log('Process/MongoDBUri', process.env.MONGODB_URI);
/* we do not have access to process.env.MONGODB_URI without
 require('dotenv').config({path:'../env.env'}) listed above */
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
/* creates an express session that stores its session data into the mLab MongoDB endpoint
go to https://www.npmjs.com/package/connect-mongo for more information */
app.use(session({
  secret: 'hratx30',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: false,
}));
/* bodyParser makes form data available in req.body,
https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
 it is deprecated in Express v4 so instead of just app.use(bodyParser)
 the two following statements are needed */
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
require('../db/passport.js')(passport);
// initialize Passport for use
app.use(passport.initialize());
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected!');
});

app.use('/api', api);


const port = process.env.PORT || 3001;
app.listen(port, () => { console.log('Running on ', port); });
