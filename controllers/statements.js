const Statement = require('../models/statement');
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
    const searchTerm = req.query.searchTerm;// Get the search term from the form
    const selectedFilters = req.query.selectedFilters; // Get selected filter options
    const filters = filterCategories;
    const baseQuery = {};
    const results = [];

    for (let filter in selectedFilters) {
        if (selectedFilters[filter].length > 0) {
            baseQuery[filter] = { $in: selectedFilters[filter] }
        }
    };

    const entries = await Statement.find(baseQuery).lean();

    if (searchTerm !== "") {
        const searchTermArray = searchTerm.split(' ').join('|'); // used to make it possible to search for more than 1 word in the search field, using OR operator
        const fuse = new Fuse(entries, {
            keys: [
                {
                    name: 'title',
                    weight: 2
                },
                {
                    name: 'summary',
                    weight: 1
                }
            ], // Specify which fields to search
            useExtendedSearch: true,
            includeScore: true, // includes search score in the item
            ignoreLocation: true, // ignore the location of the search term in the string. Good for long strings.
            threshold: 0.3, // Adjust the threshold as needed (0 to 1)
        });
        results.push(...fuse.search(searchTermArray));
    } else {
        entries.forEach((entry) => {
            results.push({
                item: entry
            })
        });
    }

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