// Retrieve username from local storage
const username = localStorage.getItem("userName");
// Dynamically update the content of the username elements
document.getElementById("usernameHeading").textContent = username;
document.getElementById("username").textContent = `@${username}`;

// Edit username in profile
document.addEventListener("DOMContentLoaded", function () {
  const usernameHeading = document.getElementById("usernameHeading");
  const username = document.getElementById("username");

  // Add click event listener to the username heading
  usernameHeading.addEventListener("click", function () {
    // Make the heading content editable
    usernameHeading.contentEditable = true;
    usernameHeading.focus();
  });

  // Add blur event listener to the username heading
  usernameHeading.addEventListener("blur", function () {
    // Remove content editable attribute
    usernameHeading.contentEditable = false;
    // Update the username with the new text
    updateUsername();
  });

  // Function to update the username
  function updateUsername() {
    // Get the new username from the heading
    const newUsername = usernameHeading.textContent.trim();
    // Update the username display
    username.textContent = `@${newUsername.toLowerCase().replace(/\s/g, "")}`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve username from localStorage
  let username = localStorage.getItem("userName");
  if (username) {
    document.getElementById("usernameHeading").innerText = username;
    document.getElementById("username").innerText = `@${username.toLowerCase().replace(/\s/g, "")}`;
  }

  // Add event listener to the h1 tag for editing
  const usernameHeading = document.getElementById("usernameHeading");
  usernameHeading.addEventListener("input", function () {
    const newUsername = usernameHeading.innerText.trim();
    if (newUsername) {
      localStorage.setItem("userName", newUsername);
      document.getElementById("username").innerText = `@${newUsername
        .toLowerCase()
        .replace(/\s/g, "")}`;
    }
  });
});
