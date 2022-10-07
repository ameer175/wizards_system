const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'User name is missing'],
    },
    password: {
        type: String,
        required: [true, 'Password is missing'],
    },
    type: {
        type: String,
        required: [true, 'User type is missing'],
    },
});

const Users = mongoose.model('users', userSchema);

module.exports = { Users };
