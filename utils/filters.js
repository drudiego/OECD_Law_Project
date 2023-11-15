//List of filters and subfilters to be used in the entire project.

module.exports.filterCategories = {
    linkedHumanRightsIssue: {
        filterName: "Linked Human Rights Issue",
        subfilters: [
            "Child labour",
            "Labour rights violation",
            "Forced labour",
            "Land grabbing",
            "Gender harassment"
        ]
    },

    corporateInvolvementToTheHarmsAndAbuses: {
        filterName: "Corporate Involvement To The Harms And Abuses",
        subfilters: [
            "Caused",
            "Contributed",
            "Directly linked"
        ]
    },

    //Not sure how this is going to be implemented
    //definingRisksHarmsAndAbuse = []

    corporateResponsibilityInUNGPsFramework: {
        filterName: "Corporate Responsibility In UNGP's Framework",
        subfilters: [
            "HRDD",
            "Human rights policy",
            "Stakeholder engagement",
            "Mitigations",
            "Remediation",
            "Transparency/communication"
        ]
    },

    specificCorporateHumanRightsResponsibilities: {
        filterName: "Specific Corporate Human Rights Responsibilities",
        subfilters: [
            "Conflict-affected zones",
            "Supply chain",
            "Climate change/environment"
        ]
    },

    actors: {
        filterName: "Actors",
        subfilters: [
            "Consulting company",
            "Audits",
            "SMEs",
            "Tech companies",
            "Parent companies",
            "Investors/Financial Institutions",
            "State responsibility"
        ]
    },

    otherSubstantialMatters: {
        filterName: "Other Substantial Matters",
        subfilters: [
            "Conflict with domestic laws",
            "Corporate governance",
            "Gaps in OECD guidelines",
            "SLAPP"
        ]
    },

    NCPsEffortsToResolveTheCases: {
        filterName: "NCP's Efforts To Resolve The Cases",
        subfilters: [
            "Hired independent mediator",
            "Hired external consultants",
            "Sought advice from other parties",
            "Hired translators",
            "Involved victims in the process",
            "Monitored and followed the companies actions"
        ]
    },

    NCPGoodOffices: {
        filterName: "NCP Good Offices",
        subfilters: [
            "Mediation",
            "Conciliation"
        ]
    },

    challengesDuringTheGoodOffice: {
        filterName: "Challenges During The Good Office",
        subfilters: [
            "Delay",
            "Breach of confidentiality",
            "Language barriers",
            "No cooperation between NCPs",
            "Parallel proceedings"
        ]
    },

    outcomesResultOfTheMediation: {
        filterName: "Outcomes/Result Of The Mediation",
        subfilters: [
            "Changes/updates of the company policy",
            "Written agreement between parties",
            "Financial compensations",
            "Disengagement/Case of operation",
            "Acknowledgements"
        ]
    },


    analysisOnStatement: {
        filterName: "Analysis On NCP's Statement",
        subfilters: [
            "Determination of compliance/non-compliance",
            "Referred instruments",
            "Referred other NCP decisions",
            "Analysed OECD Guidelines"
        ]
    }
}