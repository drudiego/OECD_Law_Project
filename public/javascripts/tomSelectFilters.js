// Initialize Tom Select
document.querySelectorAll(".select").forEach((el) => {
  new TomSelect(el, {
    plugins: [
      { name: "remove_button", options: { title: "Remove option" } },
      { name: "dropdown_header", options: { title: "Select options" } },
      { name: "dropdown_input", options: { title: "Select options" } },
      {
        name: "checkbox_options",
        options: {
          checkedClassNames: ["ts-checked"],
          uncheckedClassNames: ["ts-unchecked"],
        },
      },
    ],
    persist: false,
    create: false,
    onItemAdd: function () {
      this.setTextboxValue("");
      this.refreshOptions();
    },
    render: {
      option: function (data, escape) {
        return (
          '<div class="d-flex"><span>' + escape(data.value) + "</span></div>"
        );
      },
      item: function (data, escape) {
        return "<div>" + escape(data.value) + "</div>";
      },
    },
  });
});

// Tom Select behavior on mobile
const selectDivs = document.querySelectorAll(".ts-control");

selectDivs.forEach(function (selectDiv) {
  selectDiv.addEventListener("click", function () {
    if (window.innerWidth <= 576) {
      // Check if the viewport width is less than or equal to 576px (mobile breakpoint)
      selectDiv.scrollIntoView({ behavior: "smooth" });
    }
  });
});
