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
    setTimeout(() => {
      window.location.href = "../profile/";
    }, 2000);
  } else {
    throw new error("No access token provided");
  }
}
