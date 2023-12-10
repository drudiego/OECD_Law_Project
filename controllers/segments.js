const Statement = require("../models/statement");
const Segment = require("../models/segment.js")

module.exports.createSegment = async (req, res) => {
    const statement = await Statement.findById(req.params.id);

    const segment = new Segment(req.body.segment);
    // review.author = req.user._id;
    console.log(segment)
    segment.statementTitle = statement.title;
    console.log(segment)
    statement.segments.push(segment);
    await segment.save();
    await statement.save();
    req.flash('success', 'Created new Segment.')
    res.redirect(`/statements/${statement._id}`);

}

module.exports.updateSegment = async (req, res) => {
    const { segmentId, id } = req.params;
    const statement = await Statement.findById(id);
    const segment = await Segment.findByIdAndUpdate(segmentId, { ...req.body.segment });
    req.flash('success', 'Successfully updated the Statement');
    res.redirect(`/statements/${statement._id}`)
};

module.exports.deleteSegment = async (req, res) => {
    const { segmentId, id } = req.params;
    await Statement.findByIdAndUpdate(id, { $pull: { segments: segmentId } })
    await Segment.findByIdAndDelete(segmentId);
    req.flash('success', 'Successfully deleted Segment.')
    res.redirect(`/statements/${id}`)
}