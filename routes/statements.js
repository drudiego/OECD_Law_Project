const express = require(`express`);
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')

const { statementSchema } = require('../schemas.js')
const Statement = require('../models/statement');


const validateCampground = (req, res, next) => {
    const { error } = statementSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


router.get('/', catchAsync(async (req, res) => {
    const statements = await Statement.find({});
    res.render('statements/index', { statements })
}))

router.get('/new', (req, res) => {
    res.render('statements/new')
})

router.post('/', validateCampground, catchAsync(async (req, res) => {
    const statement = new Statement(req.body.statement);
    await statement.save();
    req.flash('success', 'Successfully made a new Statement')
    res.redirect(`/statements/${statement._id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const statement = await Statement.findById(req.params.id);
    if (!statement) {
        req.flash('error', 'Cannot find that Statement')
        return res.redirect('/statements')
    }
    res.render('statements/show', { statement })
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const statement = await Statement.findById(req.params.id);
    if (!statement) {
        req.flash('error', 'Cannot find that Statement')
        return res.redirect('/statements')
    }
    res.render('statements/edit', { statement })
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const statement = await Statement.findByIdAndUpdate(req.params.id, { ...req.body.statement });
    req.flash('success', 'Successfully updated the Statement')
    res.redirect(`/statements/${statement._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    await Statement.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted the Statement')
    res.redirect('/statements')
}))

module.exports = router