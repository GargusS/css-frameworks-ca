// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over forms and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Check form validity
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // Add validation class
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
