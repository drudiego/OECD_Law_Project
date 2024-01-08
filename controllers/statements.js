const Statement = require('../models/statement');
const Segment = require('../models/segment');
const Fuse = require('fuse.js');
const { filterCategories } = require('../utils/filters.js')

module.exports.index = async (req, res) => {
    const statements = await Statement.find({});
    const filters = filterCategories;
    res.render('statements/index', { statements, filters })
};

module.exports.renderNewForm = (req, res) => {
    const filters = filterCategories;
    res.render('statements/new', { filters })
};

module.exports.createStatement = async (req, res) => {
    // console.log(req.body.statement)
    const statement = new Statement(req.body.statement);
    statement.author = req.user._id;
    await statement.save();
    req.flash('success', 'Successfully made a new Statement');
    res.redirect(`/statements/${statement._id}`)
};

module.exports.search = async (req, res, next) => {
    // Extract the search term and selected filters from the request query
    const searchTerm = req.query.searchTerm;
    const selectedFilters = req.query.selectedFilters;

    // Define the filter categories
    const filters = filterCategories;

    // Initialize arrays to store the results, matching segments, and matching segment IDs
    const results = [];
    const matchingSegments = {};
    const matchingSegmentIds = {};

    // Iterate through the selected filters
    for (const filter in selectedFilters) {
        // Ensure that the selected filters are always an array
        if (selectedFilters[filter].length > 0) {
            selectedFilters[filter] = Array.isArray(selectedFilters[filter]) ? selectedFilters[filter] : [selectedFilters[filter]];
        }
        // Find segments that match the selected filters and store them in the matchingSegments object separated by the filter
        matchingSegments[filter] = await Segment.find({ subfilter: { $in: selectedFilters[filter] } }).lean();
        // Extract the IDs of the matching segments and store them in the matchingSegmentIds object separated by the filter
        matchingSegmentIds[filter] = matchingSegments[filter].map(segment => segment._id);
    }

    let entries;

    // If there are matching segments, construct the final query using the matching segment IDs with different arrays for each filter
    if (Object.keys(matchingSegments).length > 0) {
        const finalQuery = Object.values(matchingSegmentIds).map(ids => ({ 'segments': { $in: ids } }));
        // Find statements that match the final query using the $and operator to ensure that all filters are met
        entries = await Statement.find({ $and: finalQuery }).lean();
    } else {
        // If there are no matching segments, find all statements
        entries = await Statement.find().lean();
    }

    // If a search term is provided, perform a fuzzy search using Fuse.js
    if (searchTerm !== "") {
        // Split the search term into an array of individual terms
        const searchTermArray = searchTerm.split(' ').join('|');
        // Create a new instance of Fuse.js with the entries as the data source and specified search keys and options
        const fuse = new Fuse(entries, {
            keys: [
                { name: 'title', weight: 2 },
                { name: 'summary', weight: 1 }
            ],
            useExtendedSearch: true,
            includeScore: true,
            ignoreLocation: true,
            threshold: 0.3,
        });
        // Perform the fuzzy search using the search term array and add the results to the results array
        results.push(...fuse.search(searchTermArray));
    } else {
        // If no search term is provided, simply add each entry to the results array
        entries.forEach(entry => {
            results.push({ item: entry });
        });
    }

    // Render the search results page with the results, filters, selected filters, and search term
    res.render('statements/searchResults', { results, filters, selectedFilters, searchTerm });
};

module.exports.showStatement = async (req, res) => {
    const statement = await Statement.findById(req.params.id).populate("segments").populate("author");
    const filters = filterCategories;
    if (!statement) {
        req.flash('error', 'Cannot find that Statement');
        return res.redirect('/statements')
    }
    res.render('statements/show', { statement, filters })
};

module.exports.renderEditForm = async (req, res) => {
    const statement = await Statement.findById(req.params.id);
    const filters = filterCategories;
    if (!statement) {
        req.flash('error', 'Cannot find that Statement');
        return res.redirect('/statements')
    }
    res.render('statements/edit', { statement, filters })
};

module.exports.renderEditSegmentsForm = async (req, res) => {
    console.log("Your params:", req.params)

    const statement = await Statement.findById(req.params.id).populate("segments").populate("author");
    const filters = filterCategories;
    if (!statement) {
        req.flash('error', 'Cannot find that Statement');
        return res.redirect('/statements')
    }
    res.render('statements/editSegments', { statement, filters })
};

module.exports.updateStatement = async (req, res) => {
    const statement = await Statement.findByIdAndUpdate(req.params.id, { ...req.body.statement });
    req.flash('success', 'Successfully updated the Statement');
    res.redirect(`/statements/${statement._id}`)
};

module.exports.deleteStatement = async (req, res) => {
    await Statement.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted the Statement');
    res.redirect('/statements')
};