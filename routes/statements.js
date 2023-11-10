const express = require(`express`);
const router = express.Router();
const { filterCategories } = require('../utils/filters.js')

const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, validateCampground } = require('../middleware.js')
const Statement = require('../models/statement');


router.get('/', catchAsync(async (req, res) => {
    const statements = await Statement.find({});
    res.render('statements/index', { statements })
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