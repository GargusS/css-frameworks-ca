import { API_KEY_URL, POSTS_URL } from "../shared/constants.mjs";

// Get accessToken from LocalStorage
const accessToken = localStorage.getItem("accessToken");
let apiKey; // Define apiKey variable

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
    apiKey = data.data.key; // Assign the apiKey value
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
    apiKey = data.data.key; // Extract the apiKey from object
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
    // Grab the main container for posts
    const feedContainer = document.getElementById("feedContainer");
    // Fetch posts using the constructed options
    const response = await fetch(`${POSTS_URL}`, options);
    const posts = await response.json();
    // Display the posts
    posts.data.forEach((post) => {
      // Destructure properties from each post object
      const { title, body, updated } = post;
      // Create main anchor tag
      const issueAnchor = document.createElement("a");
      issueAnchor.classList.add("list-group-item", "list-group-item-action");

      // Create main issue container
      const issueDiv = document.createElement("div");
      issueDiv.classList.add("d-flex", "justify-content-between");

      // Create issue title
      const issueTitle = document.createElement("h5");
      issueTitle.classList.add("mb-1");
      issueTitle.textContent = title;

      // Format timestamp
      const timestamp = updated;
      const date = new Date(timestamp);

      // Format the date
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      // Create issue last updated timestamp
      const issueTime = document.createElement("small");
      issueTime.classList.add("mb-1");
      issueTime.textContent = "Created " + formattedDate;

      // Create issue body
      const issueBody = document.createElement("p");
      issueBody.classList.add("mb-1");
      issueBody.textContent = body;

      issueAnchor.append(issueDiv, issueBody);
      feedContainer.appendChild(issueAnchor);
      issueDiv.append(issueTitle, issueTime);
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}

export { apiKey };
