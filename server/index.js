const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config({path:'../env.env'});
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
console.log('Process/MongoDBUri', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true})
//creates an express session that stores its session data into the mLab MongoDB endpoint
//go to https://www.npmjs.com/package/connect-mongo for more information
app.use(session({
  secret: 'hratx30',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: false
}));

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!')
});

const port = process.env.PORT || 3001;
console.log('Running on ', port)
app.listen(port);
