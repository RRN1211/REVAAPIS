const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    email: {
        type: String,
        lowercase: true,
        match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Please fill a valid email address']
    }
});

const userModel = mongoose.model('Usuario', userSchema, 'usuarios');

module.exports = userModel;