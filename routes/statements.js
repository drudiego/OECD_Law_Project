const express = require(`express`);
const router = express.Router();

const statements = require('../controllers/statements');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateStatement } = require('../middleware.js');

router.route('/')
    .get(catchAsync(statements.index))
    .post(isLoggedIn, validateStatement, catchAsync(statements.createStatement));

router.get('/new', isLoggedIn, statements.renderNewForm);

router.get('/search', catchAsync(statements.search));

router.route('/:id')
    .get(catchAsync(statements.showStatement))
    .put(isLoggedIn, validateStatement, catchAsync(statements.updateStatement))
    .delete(isLoggedIn, catchAsync(statements.deleteStatement));

router.get('/:id/edit', isLoggedIn, catchAsync(statements.renderEditForm));

router.get('/:id/editSegments', isLoggedIn, catchAsync(statements.renderEditSegmentsForm))


module.exports = router