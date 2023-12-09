const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateSegment, isLoggedIn } = require('../middleware')
const catchAsync = require('../utils/catchAsync');
const segments = require('../controllers/segments')
const statements = require('../controllers/statements')
const Statement = require("../models/statement");
const Segment = require("../models/segment.js")


router.post('/', isLoggedIn, validateSegment, catchAsync(segments.createSegment))


router.route('/:segmentId')
    .put(isLoggedIn, validateSegment, catchAsync(segments.updateSegment))
    .delete(isLoggedIn, catchAsync(segments.deleteSegment));




module.exports = router