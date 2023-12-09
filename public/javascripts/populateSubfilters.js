//Used to make the filter and subfilter selection work when creating new segment

const goodFilters = JSON.parse(filters)

// Get references to the select fields
const filterSelect = document.getElementById('filter');
const subFilterSelect = document.getElementById('subfilter');
console.log(filterSelect)

function updateSubFilterOptions() {
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
filterSelect.addEventListener('change', updateSubFilterOptions);

