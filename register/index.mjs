import { REGISTER_URL } from "../shared/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";

const registerForm = document.querySelector("#register-form");

console.log(REGISTER_URL);

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("This is the event", event);
  const name = event.target[0].value;
  const last = event.target[1].value;
  const email = event.target[2].value;
  const password = event.target[3].value;
  registerUser(name, last, email, password);
  console.log(registerUser);
});

async function registerUser(name, last, email, password) {
  console.log("Register User");
  await doFetch(REGISTER_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      last,
      email,
      password,
    }),
  });
}
