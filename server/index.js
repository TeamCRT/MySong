const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose')

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
console.log('Process/MongoDBUri', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const port = process.env.PORT || 3001;
console.log('Running on ', port)
app.listen(port);
