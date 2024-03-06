import { LOGIN_URL } from "../shared/constants.mjs";
import { doFetch } from "./doFetch.mjs";
import { addAuthToken } from "./handleAuth.mjs";

export async function loginUser(email, password) {
  const response = await doFetch(LOGIN_URL, false, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const { data } = response;
  const { accessToken } = data;
  if (accessToken) {
    addAuthToken(accessToken);
    // If login is successful, retrieve the email from the login form
    // then,
    // Split the email address by the "@" symbol
    const parts = email.split("@");
    // Extract the username part (before the "@")
    const username = parts[0];
    // Store the username in local storage
    localStorage.setItem("userName", username);
  } else {
    throw new error("No access token provided");
  }
}
