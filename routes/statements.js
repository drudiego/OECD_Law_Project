const express = require(`express`);
const Fuse = require('fuse.js');
const router = express.Router();
const { filterCategories } = require('../utils/filters.js')

const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateStatement } = require('../middleware.js')
const Statement = require('../models/statement');


router.get('/', catchAsync(async (req, res) => {
    const statements = await Statement.find({});
    const filters = filterCategories;
    res.render('statements/index', { statements, filters })
}))

router.get('/new', isLoggedIn, (req, res) => {
    const filters = filterCategories
    res.render('statements/new', { filters })
})

router.post('/', isLoggedIn, validateStatement, catchAsync(async (req, res) => {
    const statement = new Statement(req.body.statement);
    statement.author = req.user._id;
    await statement.save();
    req.flash('success', 'Successfully made a new Statement')
    res.redirect(`/statements/${statement._id}`)
}))

// TESTANDO FUNCIONALIDADE DE BUSCA
router.get('/search', catchAsync(async (req, res, next) => {

    const searchTerm = req.query.searchTerm;// Get the search term from the form
    const searchTermArray = searchTerm.split(' ').join('|')

    const selectedFilters = req.query.selectedFilters; // Get selected filter options
    const filters = filterCategories;
    const baseQuery = {};

    for (let filter in selectedFilters) {
        if (selectedFilters[filter].length > 0) {
            baseQuery[filter] = { $in: selectedFilters[filter] }
        }
    };

    const entries = await Statement.find(baseQuery).lean();
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
        includeScore: true,
        ignoreLocation: true,
        threshold: 0.3, // Adjust the threshold as needed (0 to 1)
    });

    const results = fuse.search(searchTermArray)
    console.log(results)
    res.render('statements/searchResults', { results, filters, selectedFilters, searchTerm });
}));

// FIM DO CÓDIGO PARA FUNCIONALIDADE DE BUSCA

router.get('/:id', catchAsync(async (req, res) => {
    const statement = await Statement.findById(req.params.id).populate("author");
    const filters = filterCategories;
    if (!statement) {
        req.flash('error', 'Cannot find that Statement')
        return res.redirect('/statements')
    }
    res.render('statements/show', { statement, filters })
}))



router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {

    const statement = await Statement.findById(req.params.id);
    const filters = filterCategories
    if (!statement) {
        req.flash('error', 'Cannot find that Statement')
        return res.redirect('/statements')
    }
    res.render('statements/edit', { statement, filters })
}))

router.put('/:id', isLoggedIn, validateStatement, catchAsync(async (req, res) => {
    const statement = await Statement.findByIdAndUpdate(req.params.id, { ...req.body.statement });
    req.flash('success', 'Successfully updated the Statement')
    res.redirect(`/statements/${statement._id}`)
}))

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    await Statement.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted the Statement')
    res.redirect('/statements')
}))

module.exports = router