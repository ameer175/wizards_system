const mongoose = require('mongoose');

const wizardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Wizard name is missing'],
    },
    inputs: {
        type: Array,
        required: [true, 'Wizard inputs are missing'],
    },
    creator: {
        type: String,
        required: [true, 'Wizard creator is missing'],
    },
});

const Wizards = mongoose.model('wizards', wizardSchema);

module.exports = { Wizards };
