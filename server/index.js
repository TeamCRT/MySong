const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose')

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true})

const port = process.env.PORT || 3001;
console.log('Running on ', port)
app.listen(port);
