import { saveTicket } from "../utils/createPost.mjs";
import { deletePost } from "../utils/deletePost.mjs";
import { API_KEY_URL, POSTS_URL } from "../shared/constants.mjs";

import { logout } from "../utils/logoutUser.mjs";

let accessToken = localStorage.getItem("accessToken");
let apiKey;

/**
 * Initializes the application by fetching API key and posts, and displaying them.
 * @async
 * @function init
 * @throws {Error} Throws an error if any of the asynchronous tasks fail.
 * @returns {Promise<void>}
 */
async function init() {
  try {
    // Define the data to be sent for obtaining the API key.
    const postData = { key: "value" };

    // Fetch the API key.
    apiKey = await fetchApiKey(API_KEY_URL, accessToken, postData);

    // Fetch posts using the obtained API key and access token.
    const posts = await fetchPosts(POSTS_URL, accessToken, apiKey);

    // Display the fetched posts.
    displayPosts(posts);
  } catch (error) {
    // Handle errors occurred during initialization.
    console.error("Initialization error:", error.message);
    throw error;
  }
}

/**
 * Fetches the API key from the specified URL using the provided access token and data.
 * @async
 * @function fetchApiKey
 * @param {string} url - The URL to fetch the API key from.
 * @param {string} accessToken - The access token used for authentication.
 * @param {Object} data - The data to be sent along with the request for obtaining the API key.
 * @throws {Error} Throws an error if the fetch request fails or if the response status is not OK.
 * @returns {Promise<string>} Returns a promise that resolves with the obtained API key.
 */
async function fetchApiKey(url, accessToken, data) {
  try {
    // Perform a POST request to fetch the API key.
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    // Check if the response status is OK.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response body as JSON.
    const responseData = await response.json();

    // Extract and return the API key from the response data.
    return responseData.data.key;
  } catch (error) {
    // Log and rethrow any errors that occur during the API key fetching process.
    console.error("Error fetching API key:", error.message);
    throw error;
  }
}

/**
 * Fetches posts from the specified URL using the provided access token and API key.
 * @async
 * @function fetchPosts
 * @param {string} url - The URL from which to fetch the posts.
 * @param {string} accessToken - The access token used for authentication.
 * @param {string} apiKey - The API key required for accessing the posts.
 * @throws {Error} Throws an error if the fetch request fails or if the response status is not OK.
 * @returns {Promise<Array<Object>>} Returns a promise that resolves with an array of post objects.
 */
async function fetchPosts(url, accessToken, apiKey) {
  try {
    // Perform a fetch request to retrieve the posts.
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    // Check if the response status is OK.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response body as JSON.
    const postData = await response.json();

    // Extract and return the data containing the posts.
    return postData.data;
  } catch (error) {
    // Log and rethrow any errors that occur during the post fetching process.
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}


/**
 * Displays the given array of posts in the feed container on the webpage.
 * @async
 * @function displayPosts
 * @param {Array<Object>} posts - An array containing post objects to be displayed.
 * @returns {void} This function does not return a value directly.
 */
async function displayPosts(posts) {
  // Get the feed container element from the DOM.
  const feedContainer = document.getElementById("feedContainer");
  
  // Clear the previous posts from the feed container.
  feedContainer.innerHTML = "";

  // Iterate over each post in the array.
  posts.forEach((post) => {
    // Destructure post properties.
    const { title, body, updated, id, media, imageUrl } = post;

    // Create an anchor element for the post.
    const issueAnchor = document.createElement("a");
    issueAnchor.classList.add("list-group-item", "list-group-item-action");
    issueAnchor.style.cursor = "pointer";

    // Create a div element to contain the post content.
    const issueDiv = document.createElement("div");
    issueDiv.classList.add("d-flex", "justify-content-between", "my-4");

    // Add an image element if the post contains media.
    if (imageUrl || (media && media.url)) {
      const issueImage = document.createElement("img");
      issueImage.classList.add("img-fluid", "mt-4");
      issueImage.src = imageUrl || media.url;
      issueImage.alt = title;
      issueImage.style.maxHeight = "300px";
      issueAnchor.appendChild(issueImage);
    }

    // Create elements for the post title, time, and body.
    const issueTitle = document.createElement("h5");
    issueTitle.classList.add("mb-1");
    issueTitle.textContent = title;

    const timestamp = updated;
    const date = new Date(timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const issueTime = document.createElement("small");
    issueTime.classList.add("mb-1");
    issueTime.textContent = "Created " + formattedDate;

    const issueBody = document.createElement("p");
    issueBody.classList.add("my-1", "text-start");
    issueBody.textContent = body;

    // Append the elements to the feed container.
    issueAnchor.append(issueDiv, issueBody);
    feedContainer.appendChild(issueAnchor);
    issueDiv.append(issueTitle, issueTime);

    // Add a click event listener to each post anchor.
    issueAnchor.addEventListener("click", () => {
      handlePostClick(deletePost(id));
    });
  });
}


/**
 * Handles the click event for a post.
 * @function handlePostClick
 * @param {string} postId - The ID of the post that was clicked.
 * @returns {void} This function does not return a value directly.
 */
function handlePostClick(postId) {
  // Log the clicked post ID to the console.
  console.log("Clicked post ID:", postId);
  // Additional actions such as deleting the post or showing more details can be inserted here.
}


init();
logout();

export { apiKey };
