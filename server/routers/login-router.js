const { Router } = require('express');
const loginController = require('../controllers/login-controller');
const router = Router();

router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

module.exports = router;
