const express = require('express');
require('dotenv').config({
  path: '../env.env'
});
const path = require('path');
const http = require('http');
const api = require('./api');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


//connecting to the mongoose database
console.log('Process/MongoDBUri', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
//mongoose Promises are deprecated in Mongoose 4 (think we used mongo3 for sprint)
mongoose.Promise = global.Promise;

// Passport
app.use(session({
  secret: 'crt',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true 
}));
app.use(passport.initialize());
// app.use(passport.session()); // not using passport sessions anymore
require('../app/passport.js')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//On the server this will serve up our build folder as static files
app.use(express.static(path.join(__dirname, '../client/build')));

//Use the api routes
app.use('/api', api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (!process.env.DEV) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server listening on ${port}`);
