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
    const searchTerm = req.query.searchTerm;// Get the search term from the form
    const selectedFilters = req.query.selectedFilters; // Get selected filter options
    // console.log(selectedFilters)
    const filters = filterCategories;
    // const baseQuery = { subfilter: [] };
    console.log("filtros selecionados: ", selectedFilters)
    const results = [];
    let matchingSegments = {}
    let matchingSegmentIds = {}
    for (let filter in selectedFilters) {
        if (selectedFilters[filter].length > 0) {
            if (typeof selectedFilters[filter] === 'string') {
                selectedFilters[filter] = [selectedFilters[filter]]
            }
            // baseQuery.subfilter.push(...selectedFilters[filter])   
        }
        matchingSegments[filter] = await Segment.find({
            subfilter: { $in: selectedFilters[filter] }
        }).lean();
        matchingSegmentIds[filter] = matchingSegments[filter].map(segment => segment._id)
    };
    console.log('resultado matching: ', matchingSegments)
    // console.log("baseQuery is: ", baseQuery)
    // console.log("selectedFilters tratados: ", selectedFilters)
    let entries

    if (Object.keys(matchingSegments).length > 0) {

        // matchingSegments = await Segment.find({
        //     subfilter: { $in: baseQuery.subfilter }
        // }).lean();
        // console.log("the match: ", matchingSegments)
        // let matchingSegmentIds = {}
        // for (let matchingFilter in matchingSegments) {
        //     console.log('listando matchingfilters: ', matchingFilter)
        //     matchingSegmentIds[matchingFilter] = matchingSegments[matchingFilter].map(segment => segment._id)

        // }
        const finalQuery = []
        for (let filter in matchingSegmentIds) {
            finalQuery.push({ 'segments': { $in: matchingSegmentIds[filter] } })
        }
        console.log('este é o matchingSegmentsIds: ', matchingSegmentIds)
        console.log('este é o finalQuery: ', finalQuery)
        // const matchingSegmentIds = matchingSegments.map(segment => segment._id)
        // console.log("the ids: ", matchingSegmentIds)
        entries = await Statement.find({
            // 'segments': { $in: matchingSegmentIds }
            $and: finalQuery
        }).lean();
    } else {
        entries = await Statement.find().lean()
    }
    // console.log("entries is: ", entries)


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