import { PROFILES_URL } from "../shared/constants.mjs";
import { apiKey } from "../feed/index.mjs";

let accessToken = localStorage.getItem("accessToken");
let userName = localStorage.getItem("userName");

export async function fetchPosts(userName, accessToken, apiKey) {
  try {
    const response = await fetch(`${PROFILES_URL}/${userName}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const postData = await response.json();
    return postData.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}


// Call the fetchPosts function with all required parameters
fetchPosts(userName, accessToken, apiKey)
  .then((posts) => {
    console.log("Fetched posts:", posts);
    // Do something with the posts here, like displaying them on the UI
  })
  .catch((error) => {
    console.error("Error fetching posts:", error.message);
    // Handle the error here
  });
