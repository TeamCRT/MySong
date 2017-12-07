const api = require('./api');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

// dotenv used to store our spoitfy client_id and secret on process.env
require('dotenv').config({ path: '../env.env' });

const app = express();
const db = mongoose.connection;
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser());
/* bodyParser makes form data available in req.body,
https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
it is deprecated in Express v4 so instead of just app.use(bodyParser)
the two following statements are needed */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'hratx30',
  store: new MongoStore({ mongooseConnection: db }),
  resave: true,
  saveUninitialized: false,
}));
// app.use(cookieSession({
//   name: 'session',
//   keys: [12],
//   maxAge: 360000,
// })); // Express cookie session middleware
app.use(passport.initialize());
app.use(passport.session());
/* the below require('../db/passport.js')(passport) is used to reduce the
** amount of code in this file, look to db/passport.js for the passport
** strategies being implemented(Spotify only), without this line
** passport.authenticate() calls in server/api/index.js would not be able
** to find our spotify strategy */
require('../db/passport.js')(passport);

/* we do not have access to process.env.MONGODB_URI without
 require('dotenv').config({path:'../env.env'}) listed above */
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
/* creates an express session that stores its session data into the mLab
** MongoDB endpoint go to https://www.npmjs.com/package/connect-mongo for
** more information */

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Database connected!'); });
// routes calls to the server/api endpoint
app.use('/api', api);

const port = process.env.PORT || 3001;
app.listen(port, () => { console.log('Running on ', port); });
