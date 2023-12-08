


const goodFilters = JSON.parse(filters)


// console.log(oi + " de dentro")


// Get references to the select fields
const filterSelect = document.getElementById('filter');
const subFilterSelect = document.getElementById('subfilter');
console.log(filterSelect)
// Your filters object from EJS
// const filters = <%= JSON.stringify(filters) %>;

function updateSubFilterOptions() {
    // Log to the console to check if the event listener is triggered
    console.log('Filter changed!');
    const selectedOption = filterSelect.options[filterSelect.selectedIndex];
    const filterKey = selectedOption.getAttribute('filter-key')
    console.log(filterKey)
    // Clear existing options in the second select field
    subFilterSelect.innerHTML = '<option value="" selected></option>';

    // Get the selected filter value from the first select field
    // const selectedFilter = filterSelect.filterKey;

    // Log the selected filter for debugging
    // console.log('Selected Filter:', selectedFilter);
    // console.log(goodFilters[filterKey].subfilters)

    // Check if the selected filter has associated sub-filters
    if (goodFilters[filterKey] && goodFilters[filterKey].subfilters) {
        // Log to the console to check if this block is executed
        console.log('Sub-filters found!');

        // Log the sub-filters for debugging
        console.log('Sub-filters:', goodFilters[filterKey].subfilters);

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

