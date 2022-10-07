const bl = require('../business-logic');
const { isAuthorized } = require('./utils/is-authorized');

async function submitWizard(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'user');
        const wizardId = await bl.submitWizard(req.body);
        await res.status(200).json({ wizardId });
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = {
    submitWizard,
};
