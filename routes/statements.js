const express = require(`express`);
const router = express.Router();
const { filterCategories } = require('../utils/filters.js')

const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateCampground } = require('../middleware.js')
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

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const statement = new Statement(req.body.statement);
    statement.author = req.user._id;
    await statement.save();
    req.flash('success', 'Successfully made a new Statement')
    res.redirect(`/statements/${statement._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const statement = await Statement.findById(req.params.id).populate("author");
    if (!statement) {
        req.flash('error', 'Cannot find that Statement')
        return res.redirect('/statements')
    }
    res.render('statements/show', { statement })
}))

// TESTANDO FUNCIONALIDADE DE BUSCA
router.post('/search', catchAsync(async (req, res, next) => {
    const searchTerm = req.body.searchTerm; // Get the search term from the form
    const selectedFilters = req.body.selectedFilters; // Get selected filter options
    const baseQuery = {
        $or: [
            { title: { $regex: `\\b${searchTerm}\\b`, $options: 'i' } }, // Search by name
            { summary: { $regex: `\\b${searchTerm}\\b`, $options: 'i' } }, // Search by summary
        ]
    };

    for (let filter in selectedFilters) {
        if (selectedFilters[filter].length > 0) {
            baseQuery[filter] = { $in: selectedFilters[filter] }
        }
    };

    const results = await Statement.find(baseQuery).exec()
    res.render('statements/searchResults', { results });
}));

// FIM DO CÓDIGO PARA FUNCIONALIDADE DE BUSCA

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {

    const statement = await Statement.findById(req.params.id);
    const filters = filterCategories
    if (!statement) {
        req.flash('error', 'Cannot find that Statement')
        return res.redirect('/statements')
    }
    res.render('statements/edit', { statement, filters })
}))

router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
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