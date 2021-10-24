// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


// parse env variables
require('dotenv').config();

const db = require('./config/config').get(process.env.NODE_ENV);


// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cookieParser())

// app.set('view engine', 'html');

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology:true }, function(err){
    if(err) console.log(err);
    console.log("database is connected");
});


// Defining route middleware
app.use('/', require('./routes/api'));


// Listening to port

app.listen(port, ()=>{
    console.log(`app is live at ${port}`);
});

module.exports = app;
