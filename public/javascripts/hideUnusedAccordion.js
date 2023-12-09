//This funcion is used simply to hide the unused filters in the accordion on the show page.
// First, sanitize the statement so it won't have issues because of HTML escaping
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

// Parse the sanitized statements
const goodStatements = JSON.parse(reSanitizedStatement)
// const accordionItemSelect = document.getElementBy

// Make arrays of existing filters of the segments in the statement
const existingFilters = [];
for (let segment of goodStatements.segments) {
    existingFilters.push(segment.filter)
}

// Iterate the existingFilters array and remove the hidden attribute from the div of the corresponding filter, making it show up.
// All the other filters keep the hidden attribute and don't show in the page. 
existingFilters.forEach(e => {
    hidden = document.querySelector(`[filter-name='${e}']`)
    hidden.removeAttribute('hidden')
})