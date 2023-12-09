//Used to make the filter and subfilter selection work when creating new segment

const goodFilters = JSON.parse(filters)
const segmentsFilterID = []
for (segment of goodStatements.segments) {
    // Get references to the select fields
    const filterSelect = document.getElementById(`filter-${segment._id}`);
    segmentsFilterID.push(filterSelect)

    const subFilterSelect = document.getElementById(`subfilter-${segment._id}`);
    // updateSubFilterOptions(filterSelect, subFilterSelect)
    preSelectSubfilter(filterSelect, subFilterSelect);


}

function preSelectSubfilter(filterSelect, subFilterSelect) {
    const selectedOption = filterSelect.options[filterSelect.selectedIndex];
    const filterKey = selectedOption.getAttribute('filter-key')
    // console.log(filterKey)

    // Clear existing options in the second select field
    subFilterSelect.innerHTML = '<option value=""></option>';

    // Check if the selected filter has associated sub-filters
    if (goodFilters[filterKey] && goodFilters[filterKey].subfilters) {
        // Log to the console to check if this block is executed
        // console.log('Sub-filters found!');
        // Log the sub-filters for debugging
        // console.log('Sub-filters:', goodFilters[filterKey].subfilters);

        // Populate options in the second select field based on the selected filter
        goodFilters[filterKey].subfilters.forEach(subfilter => {
            const option = document.createElement('option');
            option.value = subfilter;
            option.textContent = subfilter;
            subFilterSelect.appendChild(option);
            if (subfilter === segment.subfilter) {
                option.setAttribute("selected", "")
            }
        });
    }
}

console.log(segmentsFilterID)

const filterSelect = document.getElementById(`filter-${segment._id}`);
const subFilterSelect = document.getElementById(`subfilter-${segment._id}`);
console.log(filterSelect)
function updateSubFilterOptions(filterSelect, subFilterSelect) {
    // Log to the console to check if the event listener is triggered
    // console.log('Filter changed!');
    const selectedOption = filterSelect.options[filterSelect.selectedIndex];
    const filterKey = selectedOption.getAttribute('filter-key')
    // console.log(filterKey)

    // Clear existing options in the second select field
    subFilterSelect.innerHTML = '<option value="" selected></option>';

    // Check if the selected filter has associated sub-filters
    if (goodFilters[filterKey] && goodFilters[filterKey].subfilters) {
        // Log to the console to check if this block is executed
        // console.log('Sub-filters found!');
        // Log the sub-filters for debugging
        // console.log('Sub-filters:', goodFilters[filterKey].subfilters);

        // Populate options in the second select field based on the selected filter
        goodFilters[filterKey].subfilters.forEach(subfilter => {
            const option = document.createElement('option');
            option.value = subfilter;
            option.textContent = subfilter;
            subFilterSelect.appendChild(option);
        });
    }
}



// Add an event listener to the first select field
segmentsFilterID.forEach(s => {
    s.addEventListener('change', updateSubFilterOptions(filterSelect, subFilterSelect));
})


