const jwt = require('jsonwebtoken');
const config = require('config');
const { tryLogin } = require('../services/login-service');
const jwtConfig = config.get('jwt');

const maxAge = 3 * 24 * 60 * 60;

function createToken(id, role) {
    return jwt.sign({ id, role }, jwtConfig.secret, {
        expiresIn: maxAge,
    });
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await tryLogin(username.toLowerCase(), password);
    if (user instanceof Error) {
        res.status(401).json({ message: 'Invalid username or password' });
    } else {
        const token = createToken(user.username, user.type);
        const tokenAge = maxAge * 1000 * 1000;
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenAge });
        res.status(201).json({
            userId: user._id,
            username: user.username,
            type: user.type,
        });
    }
}

async function logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ logged_out: true });
}

module.exports = { login, logout };
