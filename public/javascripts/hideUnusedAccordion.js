//this funcion is used simply to hide the unused filters in the accordion on the show page.
const sanitizedStatement = statement.replace(/[\r\n']/g, function (match) {
    switch (match) {
        case '\r':
            return '\\r';
        case '\n':
            return '\\n';
        case "'":
            return "\\'"; // Escaping single quote
        default:
            return match;
    }
});
const reSanitizedStatement = sanitizedStatement.replace(/\\/g, '\\\\');

const goodStatements = JSON.parse(reSanitizedStatement)
const accordionItemSelect = document.getElementBy

const existingFilters = [];
for (let segment of goodStatements.segments) {

    existingFilters.push(segment.filter)
}

existingFilters.forEach(e => {
    hidden = document.querySelector(`[filter-name='${e}']`)
    hidden.removeAttribute('hidden')
})