const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
    statementTitle: String,
    body: String,
    filter: String,
    subfilter: String,

})

module.exports = mongoose.model("Segment", segmentSchema);