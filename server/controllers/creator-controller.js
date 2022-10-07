const bl = require('../business-logic');
const { isAuthorized } = require('./utils/is-authorized');

async function insertWizard(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'wizard_creator');
        const wizardId = await bl.insertWizard(req.body);
        await res.status(200).json({ wizardId });
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}
async function getResults(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'wizard_creator');
        const results = await bl.getResults(req.params);
        await res.status(200).json(results);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function deleteWizard(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'wizard_creator');
        const results = await bl.deleteWizard(req.params.id);
        await res.status(200).json(results);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = {
    insertWizard,
    getResults,
    deleteWizard,
};
