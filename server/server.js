// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const {auth} = require('./middlewares/auth');

// parse env variables
require('dotenv').config();

const db = require('./config/config').get(process.env.NODE_ENV);


// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser())

// app.set('view engine', 'html');

// Static folder
// app.use(express.static(__dirname + '/views/'));

// Defining route middleware
// app.use('/api', require('./routes/api'));

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology:true }, function(err){
    if(err) console.log(err);
    console.log("database is connected");
});

app.get('/', function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

// Listening to port

app.listen(port, ()=>{
    console.log(`app is live at ${port}`);
});

module.exports = app;
