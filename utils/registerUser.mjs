import { REGISTER_URL } from "../shared/constants.mjs";
import { doFetch } from "./doFetch.mjs";

export async function registerUser(name, last, email, password) {
  await doFetch(REGISTER_URL, false, {
    method: "POST",
    body: JSON.stringify({
      name,
      last,
      email,
      password,
    }),
  });
}
