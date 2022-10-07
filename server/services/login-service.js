const { Users } = require('../models/users');

async function tryLogin(username, password) {
    const user = await Users.findOne({ username, password });

    if (!user) {
        return new Error('Auth error');
    }

    return user._doc;
}

module.exports = {
    tryLogin,
};
