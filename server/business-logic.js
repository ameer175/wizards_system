const { Results } = require('./models/results');
const { Wizards } = require('./models/wizards');

async function getAllWizards() {
    const wizards = await Wizards.find();
    return wizards;
}

async function insertWizard(wizardData) {
    const wizard = new Wizards(wizardData);
    const res = await wizard.save();
    return res._id;
}

async function submitWizard(wizardData) {
    const wizardResult = new Results(wizardData);
    const res = await wizardResult.save();
    return res._id;
}

async function deleteWizard(id) {
    const res = await Wizards.findByIdAndDelete(id);
    return res;
}

async function getResults({ creator, name }) {
    const results = await Results.find({ name, creator });
    return results;
}

module.exports = {
    getAllWizards,
    getResults,
    insertWizard,
    submitWizard,
    deleteWizard,
};
