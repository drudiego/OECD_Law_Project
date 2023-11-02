const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StatementSchema = new Schema({
    title: {
        type: String
    },
    actors: String,
    analysisOfNCP: String,
    summary: String,
    location: String
});

module.exports = mongoose.model('Statement', StatementSchema);