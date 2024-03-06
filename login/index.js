import { loginUser } from "../utils/loginUser.mjs";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;
  loginUser(email, password);

  // If login is successful, and user is redirected to profile page; retrieve the email from the login form
  // then,
  // Split the email address by the "@" symbol
  const parts = email.split("@");
  // Extract the username part (before the "@")
  const username = parts[0];
  // Store the username in local storage
  localStorage.setItem("userName", username);

});

