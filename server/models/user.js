var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const confiq = require('../config/config').get(process.env.NODE_ENV);
const salt = 10;

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 100,
        required: true
    },
    lastName: {
        type: String,
        maxLength: 100,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    confirmPassword:{
        type:String,
        required: true,
        minlength:8

    },
    token:{
        type: String
    }
})

// mongoose middleware, function will be executed itself when we are going to save user in DB
// used for hashing password
userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(salt, (err,salt) => {
            if(err){
                return next(err);
            }

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err){
                    return next(err);
                }
                user.password = hash;
                user.confirmPassword = hash;
                next();
            })
        })
    } else {
        next();
    }


});

// function for comparing the user password
userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err){
            return cb(next);
        }
        cb(null, isMatch);
    })
};

// generate user token
userSchema.methods.generateToken = function(cb) {
     var user =  this;
     var token = jwt.sign(user._id.toHexString(),confiq.SECRET);

     user.token = token;
     user.save((err,user) => {
         if(err){
            return cb(err);
         } 
         cb(null,user);
     })
}

// find by token
userSchema.statics.findByToken = function(token,cb) {
    var user = this;

    jwt.verify(token, confiq.SECRET, (err,decode) => {
        user.findOne({"_id": decode, "token":token}, (err,user) => {
            if(err){
                return cb(err);
            }
            cb(null,user);
        })
    })
};

//delete token
userSchema.methods.deleteToken = function(token,cb) {
    var user = this;

    user.update({$unset : {token :1}}, (err,user) => {
        if(err){
            return cb(err);
        }
        cb(null,user);
    })
}

module.exports = mongoose.model('User', userSchema);