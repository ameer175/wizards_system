const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
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
    filler: {
        type: String,
        required: [true, 'Wizard filler is missing'],
    },
});

const Results = mongoose.model('results', resultSchema);

module.exports = { Results };
