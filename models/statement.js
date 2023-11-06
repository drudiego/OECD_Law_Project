const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StatementSchema = new Schema({
    title: {
        type: String
    },
    summary: String,
    location: String,
    linkedHumanRightsIssue: {
        type: String,
        enum: ["Child labour", "Labour rights violation", "Forced labour", "Land grabbing", "Gender harassment"]
    },
    corporateInvolvementToTheHarmsAndAbuses: {
        type: String,
        enum: ["Caused", "Contributed", "Directly linked"]
    },
    //check this one if there's gonna be selectors
    // definingRisksHarmsAndAbuse: {
    //     type: String,

    // },
    corporateResponsibilityInUNGPsFramework: {
        type: String,
        enum: ["HRDD", "Human rights policy", "Stakeholder engagement", "Mitigations", "Remediation", "Transparency/communication"]
    },
    specificCorporateHumanRightsResponsibilities: {
        type: String,
        enum: ["Conflict-affected zones", "Supply chain", "Climate change/environment"]
    },
    actors: {
        type: String,
        enum: ["Consulting company", "Audits", "SMEs", "Tech companies", "Parent companies", "Investors/Financial Institutions", "State responsibility"]
    },
    otherSubstantialMatters: {
        type: String,
        enum: ["Conflict with domestic laws", "Corporate governance", "Gaps in OECD guidelines", "SLAPP"]
    },
    NCPsEffortsToResolveTheCases: {
        type: String,
        enum: ["Hired independent mediator", "Hired external consultants", "Sought advice from other parties", "Hired translators", "Involved victims in the process", "Monitored and followed the companies actions"]
    },
    NCPGoodOffices: {
        type: String,
        enum: ["Mediation", "Conciliation"]
    },
    challengesDurigTheGoodOffice: {
        type: String,
        enum: ["Delay", "Breach of confidentiality", "Language barriers", "No cooperation between NCPs", "Parallel proceedings"]
    },
    outcomesResultOfTheMediation: {
        type: String,
        enum: ["Changes/updates of the company policy", "Written agreement between parties", "Financial compensations", "Disengagement/Case of operation", "Acknowledgements"]
    },
    analysisOnStatement: {
        type: String,
        enum: ["Determination of compliance/non-compliance", "Referred instruments", "Referred other NCP decisions", "Analysed OECD Guidelines"]
    },


    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Statement', StatementSchema);