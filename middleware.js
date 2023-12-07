const { statementSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must be signed in first.");
        return res.redirect('/login')
    };
    next()
}

module.exports.validateStatement = (req, res, next) => {
    // When the user selects only one option form the checkbox multi select field, the HTML form automatically passes it as a string instead of an array.
    // If more than one option is selected, it is passed as an array.
    // The following makeCheckboxArrays function is there just to make sure that, all the multi select fields are always passed as an array, even when only one option is selected.
    // this is necessary in order to comply with the validation from the schemas.
    const reqBodyStatement = req.body.statement
    makeCheckboxArrays = function () {
        console.log(reqBodyStatement)
        for (element in reqBodyStatement) {
            if (element !== "title" && element !== "year" && element !== "description" && element !== "summary" && element !== "hostCountry") {
                if (typeof reqBodyStatement[element] === 'string') {
                    reqBodyStatement[element] = [reqBodyStatement[element]]
                }
            }
        }
    }
    makeCheckboxArrays()

    const { error } = statementSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}