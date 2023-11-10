const Joi = require('joi');


module.exports.statementSchema = Joi.object({
    statement: Joi.object({
        title: Joi.string().required(),
        summary: Joi.string().required(),
        location: Joi.string().required(),
        linkedHumanRightsIssue: Joi.string().required(),
        corporateInvolvementToTheHarmsAndAbuses: Joi.string().required(),
        // definingRisksHarmsAndAbuse: Joi.string().required(),
        corporateResponsibilityInUNGPsFramework: Joi.string().required(),
        specificCorporateHumanRightsResponsibilities: Joi.string().required(),
        actors: Joi.string().required(),
        otherSubstantialMatters: Joi.string().required(),
        NCPsEffortsToResolveTheCases: Joi.string().required(),
        NCPGoodOffices: Joi.string().required(),
        challengesDuringTheGoodOffice: Joi.string().required(),
        outcomesResultOfTheMediation: Joi.string().required(),
        analysisOnStatement: Joi.string().required(),

    }).required()
});

