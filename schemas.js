const Joi = require('joi');


module.exports.statementSchema = Joi.object({
    statement: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        summary: Joi.string().required(),
        actors: Joi.string().required(),
    }).required()
});

