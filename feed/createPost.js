// Importing the POSTS_URL constant from constants.mjs
import { POSTS_URL } from "../shared/constants.mjs";
import { apiKey } from "./index.mjs";

// Get accessToken from LocalStorage
const accessToken = localStorage.getItem("accessToken");

// Define a function to handle the form submission
function saveTicket() {
  // Get form data
  var title = document.getElementById("title").value;
  var issueDescription = document.getElementById("issueDescription").value;
  console.log(title, issueDescription);

  // Create a data object to send to the server
  const postContent = {
    title: title,
    body: issueDescription,
  };

  // Perform an HTTP POST request to the server
  fetch(POSTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(postContent),
  })
    .then((response) => {
      if (response.ok) {
        // Handle success
        console.log("Ticket saved successfully!");
        // Close the modal or perform any other actions
        var myModal = new bootstrap.Modal(document.getElementById("newTicketForm"));
        myModal.hide();
      } else {
        // Handle errors
        console.log(apiKey);
        console.error("Failed to save ticket:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error saving ticket:", error);
    });
}
document.querySelector(".saveBtn").addEventListener("click", saveTicket);
