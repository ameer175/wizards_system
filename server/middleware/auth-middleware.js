const jwt = require('jsonwebtoken');
const config = require('config');
const jwtConfig = config.get('jwt');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
            if (err) {
                res.send('Token invalid');
            } else {
                res.locals.token = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).send('Please login');
    }
};

module.exports = { requireAuth };
