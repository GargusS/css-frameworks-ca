// Disabling form submissions if there are invalid fields
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
        } else {
          // If the form is valid, perform additional checks here if needed
          const invalidCheck = form.querySelector("#invalidCheck");
          if (invalidCheck && !invalidCheck.checked) {
            event.preventDefault();
            alert("Please agree to the forums conditions.");
          }
        }
        // Add validation class
        form.classList.add("was-validated");
        // If additional checks passed and form is valid, redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "../profile/";
        }, 2000);
      },
      false
    );
  });
})();
