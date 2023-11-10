const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { filterCategories } = require('../utils/filters')


const StatementSchema = new Schema({
    title: {
        type: String
    },
    summary: String,
    location: String,
    linkedHumanRightsIssue: {
        type: String,
        enum: filterCategories.linkedHumanRightsIssue
    },
    corporateInvolvementToTheHarmsAndAbuses: {
        type: String,
        enum: filterCategories.corporateInvolvementToTheHarmsAndAbuses
    },
    //check this one if there's gonna be selectors
    // definingRisksHarmsAndAbuse: {
    //     type: String,

    // },
    corporateResponsibilityInUNGPsFramework: {
        type: String,
        enum: filterCategories.corporateResponsibilityInUNGPsFramework
    },
    specificCorporateHumanRightsResponsibilities: {
        type: String,
        enum: filterCategories.specificCorporateHumanRightsResponsibilities
    },
    actors: {
        type: String,
        enum: filterCategories.actors
    },
    otherSubstantialMatters: {
        type: String,
        enum: filterCategories.otherSubstantialMatters
    },
    NCPsEffortsToResolveTheCases: {
        type: String,
        enum: filterCategories.NCPsEffortsToResolveTheCases
    },
    NCPGoodOffices: {
        type: String,
        enum: filterCategories.NCPGoodOffices
    },
    challengesDuringTheGoodOffice: {
        type: String,
        enum: filterCategories.challengesDuringTheGoodOffice
    },
    outcomesResultOfTheMediation: {
        type: String,
        enum: filterCategories.outcomesResultOfTheMediation
    },
    analysisOnStatement: {
        type: String,
        enum: filterCategories.analysisOnStatement
    },


    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Statement', StatementSchema);