const prodParents = document.querySelectorAll(".prodParent");

import $ from "jquery";
prodParents.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id === "add-to-cart") {
      $("#contact-us").modal("show");
    }
  });
});
