import { loginUser } from "../utils/loginUser.mjs";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;
  loginUser(email, password);
});

