import { getAuthToken } from "./handleAuth.mjs";

export async function doFetch(url, isAuth = false, options = {}) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (isAuth) {
      const authToken = getAuthToken();
      headers["authorization"] = `Bearer ${authToken}`;
    }

    const combinedOptions = { headers, ...options };

    const response = await fetch(url, combinedOptions);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    //
  }
}
