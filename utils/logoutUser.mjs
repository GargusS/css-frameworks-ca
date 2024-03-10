function logout() {
  const logoutButton = document.getElementById("logoutButton"); // Change the ID to match your button ID

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();

    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");

    // Create a popup notification
    const popup = document.createElement("div");
    popup.classList.add("popup", "display-6", "text-center");
    popup.textContent = "You have been successfully logged out.";

    // Append the popup to the body
    document.body.appendChild(popup);

    // Remove the popup after a certain duration
    setTimeout(() => {
      popup.remove();
    }, 3000);
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 4000);
  });
}

export { logout };
