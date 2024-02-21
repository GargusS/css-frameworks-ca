import { LOGIN_URL } from "../shared/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";

const loginForm = document.querySelector("#login-form");

console.log(LOGIN_URL);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  const email = event.target[0].value;
  const password = event.target[1].value;
  loginUser(email, password);
  console.log(loginUser);
});

async function loginUser(email, password) {
  console.log("login User");
  await doFetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
