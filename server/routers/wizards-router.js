const { Router } = require('express');
const { requireAuth } = require('../middleware/auth-middleware');
const anonymousController = require('../controllers/anonymous-controller');
const creatorController = require('../controllers/creator-controller');
const userController = require('../controllers/user-controller');
const router = Router();

router.get('/', requireAuth, anonymousController.getAllWizards);
router.post('/', requireAuth, creatorController.insertWizard);
router.post('/submit', requireAuth, userController.submitWizard);
router.get(
    '/results/:creator/:name',
    requireAuth,
    creatorController.getResults
);
router.delete('/:id', requireAuth, creatorController.deleteWizard);

module.exports = router;
