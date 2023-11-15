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
        enum: filterCategories.linkedHumanRightsIssue.subfilters
    },
    corporateInvolvementToTheHarmsAndAbuses: {
        type: String,
        enum: filterCategories.corporateInvolvementToTheHarmsAndAbuses.subfilters
    },

    //check this one if there's gonna be selectors
    // definingRisksHarmsAndAbuse: {
    //     type: String,
    //     enum: filterCategories.definingRisksHarmsAndAbuse.subfilters
    // },

    corporateResponsibilityInUNGPsFramework: {
        type: String,
        enum: filterCategories.corporateResponsibilityInUNGPsFramework.subfilters
    },
    specificCorporateHumanRightsResponsibilities: {
        type: String,
        enum: filterCategories.specificCorporateHumanRightsResponsibilities.subfilters
    },
    actors: {
        type: String,
        enum: filterCategories.actors.subfilters
    },
    otherSubstantialMatters: {
        type: String,
        enum: filterCategories.otherSubstantialMatters.subfilters
    },
    NCPsEffortsToResolveTheCases: {
        type: String,
        enum: filterCategories.NCPsEffortsToResolveTheCases.subfilters
    },
    NCPGoodOffices: {
        type: String,
        enum: filterCategories.NCPGoodOffices.subfilters
    },
    challengesDuringTheGoodOffice: {
        type: String,
        enum: filterCategories.challengesDuringTheGoodOffice.subfilters
    },
    outcomesResultOfTheMediation: {
        type: String,
        enum: filterCategories.outcomesResultOfTheMediation.subfilters
    },
    analysisOnStatement: {
        type: String,
        enum: filterCategories.analysisOnStatement.subfilters
    },


    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Statement', StatementSchema);