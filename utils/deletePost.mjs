// Importing the POSTS_URL constant from constants.mjs
import { POSTS_URL } from "../shared/constants.mjs";
import { apiKey } from "../feed/index.mjs";

// Get accessToken from LocalStorage
const accessToken = localStorage.getItem("accessToken");

// Define a function to handle deleting a post
export function deletePost(postId) {
  // Perform an HTTP DELETE request to the server
  fetch(`${POSTS_URL}/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        // Handle success
        console.log("Post deleted successfully!");
        // Refresh or update your UI as needed
      } else {
        // Handle errors
        console.error("Failed to delete post:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}
