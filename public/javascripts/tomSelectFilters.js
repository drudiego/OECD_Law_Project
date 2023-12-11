
// Initialize Tom Select
document.querySelectorAll('.select').forEach((el) => {
    new TomSelect(el, {
        plugins: [
            { name: 'remove_button', options: { title: "Remove option" } },
            { name: 'clear_button', options: { title: "Remove all options" } },
            {
                name: 'checkbox_options', options: {
                    'checkedClassNames': ['ts-checked'],
                    'uncheckedClassNames': ['ts-unchecked'],
                }
            }
        ],
        persist: false,
        create: false,
        onItemAdd: function () {
            this.setTextboxValue('');
            this.refreshOptions();
        },
        render: {
            option: function (data, escape) {
                return '<div class="d-flex"><span>' + escape(data.value) + '</span></div>';
            },
            item: function (data, escape) {
                return '<div>' + escape(data.value) + '</div>';
            }
        }
    });
})
