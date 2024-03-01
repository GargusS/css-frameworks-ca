import { API_KEY_URL, POSTS_URL } from "../shared/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";

// Get accessToken from LocalStorage
const accessToken = localStorage.getItem("accessToken");

async function postDataWithAuth(url, accessToken, bodyData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

const postData = { key: "value" };
// Call postDataWithAuth to get the API key
postDataWithAuth(API_KEY_URL, accessToken, postData)
  .then((data) => {
    const apiKey = data.data.key; // Extract the apiKey from object

    // Call getPosts with the API key
    getPosts(apiKey);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

async function getPosts(apiKey) {
  try {
    // Construct the options object for fetching the posts
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    };

    // Fetch posts using the constructed options
    const response = await fetch(`${POSTS_URL}`, options);
    const posts = await response.json();
    // Display the posts
    console.log(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}
