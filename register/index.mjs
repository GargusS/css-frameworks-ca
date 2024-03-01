import { registerUser } from "../utils/registerUser.mjs";

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target[0].value;
  const last = event.target[1].value;
  const email = event.target[2].value;
  const password = event.target[3].value;
  registerUser(name, last, email, password);
});
