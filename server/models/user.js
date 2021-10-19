var mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);