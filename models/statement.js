const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { filterCategories } = require('../utils/filters')

const FileSchema = new Schema({
    url: String,
    filename: String
});

FileSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
});

const StatementSchema = new Schema({
    //Name of the case
    title: {
        type: String
    },
    // Super short description to appear in the search page card of the statement
    description: String,
    // a summary of the case that appears in the show page of the statement
    summary: String,
    year: Number,
    // PDF will be included after setting up cloudinary
    // pdfFile: [FileSchema],

    // Filters BEGIN here:
    hostCountry: {
        type: String,
        enum: filterCategories.hostCountry.subfilters
    },
    // THIS WILL BE IMPLEMENTED AFTER FIGURING OUT LEAFLET FOR THE MAP
    // geometry: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    statusOfTheCase: {
        type: [String],
        enum: filterCategories.statusOfTheCase.subfilters
    },
    linkedHumanRightsIssue: {
        type: [String],
        enum: filterCategories.linkedHumanRightsIssue.subfilters
    },
    corporateInvolvementToTheHarmsAndAbuses: {
        type: [String],
        enum: filterCategories.corporateInvolvementToTheHarmsAndAbuses.subfilters
    },
    definingRisksHarmsAndAbuse: {
        type: [String],
        enum: filterCategories.definingRisksHarmsAndAbuse.subfilters
    },
    corporateResponsibilityInUNGPsFramework: {
        type: [String],
        enum: filterCategories.corporateResponsibilityInUNGPsFramework.subfilters
    },
    specificCorporateHumanRightsResponsibilities: {
        type: [String],
        enum: filterCategories.specificCorporateHumanRightsResponsibilities.subfilters
    },
    actors: {
        type: [String],
        enum: filterCategories.actors.subfilters
    },
    otherSubstantialMatters: {
        type: [String],
        enum: filterCategories.otherSubstantialMatters.subfilters
    },
    NCPsEffortsToResolveTheCases: {
        type: [String],
        enum: filterCategories.NCPsEffortsToResolveTheCases.subfilters
    },
    NCPGoodOffices: {
        type: [String],
        enum: filterCategories.NCPGoodOffices.subfilters
    },
    challengesDuringTheGoodOffice: {
        type: [String],
        enum: filterCategories.challengesDuringTheGoodOffice.subfilters
    },
    outcomesResultOfTheMediation: {
        type: [String],
        enum: filterCategories.outcomesResultOfTheMediation.subfilters
    },
    analysisOnStatement: {
        type: [String],
        enum: filterCategories.analysisOnStatement.subfilters
    },
    // Filters END here

    segments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Segment'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Statement', StatementSchema);