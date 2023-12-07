const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentSchema = new Schema({
    body: String,
    subfilter: String
})

module.exports = mongoose.model("Segment", segmentSchema);