const Joi = require('joi');


module.exports.statementSchema = Joi.object({
    statement: Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        summary: Joi.string(),
        year: Joi.number(),
        // statusOfTheCase: Joi.array().items(Joi.string()),
        // hostCountry: Joi.string(),
        // linkedHumanRightsIssue: Joi.array().items(Joi.string()),
        // corporateInvolvementToTheHarmsAndAbuses: Joi.array().items(Joi.string()),
        // definingRisksHarmsAndAbuse: Joi.array().items(Joi.string()),
        // corporateResponsibilityInUNGPsFramework: Joi.array().items(Joi.string()),
        // specificCorporateHumanRightsResponsibilities: Joi.array().items(Joi.string()),
        // actors: Joi.array().items(Joi.string()),
        // otherSubstantialMatters: Joi.array().items(Joi.string()),
        // NCPsEffortsToResolveTheCases: Joi.array().items(Joi.string()),
        // NCPGoodOffices: Joi.array().items(Joi.string()),
        // challengesDuringTheGoodOffice: Joi.array().items(Joi.string()),
        // outcomesResultOfTheMediation: Joi.array().items(Joi.string()),
        // analysisOnStatement: Joi.array().items(Joi.string()),

    }).required()
});

module.exports.segmentSchema = Joi.object({
    segment: Joi.object({
        body: Joi.string().required(),
        filter: Joi.string().required(),
        subfilter: Joi.string().required()
    }).required()
})