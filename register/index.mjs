import { registerUser } from "../utils/registerUser.mjs";

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target[0].value;
  const last = event.target[1].value;
  const email = event.target[2].value;
  const password = event.target[3].value;
  registerUser(name, last, email, password);

  // If register is successful, and user is redirected to profile page; retrieve the email from the login form
  // then,
  // Split the email address by the "@" symbol
  const parts = email.split("@");
  // Extract the username part (before the "@")
  const username = parts[0];
  // Store the username in local storage
  localStorage.setItem("userName", username);
});
