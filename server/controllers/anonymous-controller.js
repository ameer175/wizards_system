const bl = require('../business-logic');

async function getAllWizards(req, res) {
    try {
        const wizards = await bl.getAllWizards();

        if (res.locals.token.role === 'wizard_creator') {
            const filtered = wizards.filter(
                (w) => w.creator === res.locals.token.id
            );
            await res.status(200).json(filtered);
        } else {
            await res.status(200).json(wizards);
        }
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllWizards,
};
