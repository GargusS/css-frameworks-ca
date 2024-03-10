// Import the fetchPosts function
//import { fetchPosts } from "../utils/latestUserPosts.mjs";
import { logout } from "../utils/logoutUser.mjs";
let accessToken = localStorage.getItem("accessToken");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Retrieve username from localStorage
    let username = localStorage.getItem("userName");
    if (username) {
      document.getElementById("usernameHeading").innerText = username;
      document.getElementById("username").innerText = `@${username
        .toLowerCase()
        .replace(/\s/g, "")}`;
    }
  } catch (error) {
    // Handle the error
    alert("Error fetching or displaying posts:", error.message);
  }
});

//function logout() {}
logout()