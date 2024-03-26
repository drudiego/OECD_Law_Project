const express = require(`express`);
const router = express.Router();

const statements = require('../controllers/statements');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateStatement } = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' });

router.route('/')
    .get(catchAsync(statements.index))
    .post(isLoggedIn, upload.array('pdfFile'),  validateStatement, catchAsync(statements.createStatement));
    // .post(upload.single('pdfFile'), (req, res) => {
    //     console.log(req.body, req.file)
    //     res.send("Working")
    // })


router.get('/about', statements.renderAbout);

router.get('/staff', statements.renderStaff);

router.get('/new', isLoggedIn, statements.renderNewForm);

router.get('/search', catchAsync(statements.search));

router.route('/:id')
    .get(catchAsync(statements.showStatement))
    .put(isLoggedIn, upload.array('pdfFile'),  validateStatement, catchAsync(statements.updateStatement))
    .delete(isLoggedIn, catchAsync(statements.deleteStatement));

router.get('/:id/edit', isLoggedIn, catchAsync(statements.renderEditForm));

router.get('/:id/editSegments', isLoggedIn, catchAsync(statements.renderEditSegmentsForm))


module.exports = router