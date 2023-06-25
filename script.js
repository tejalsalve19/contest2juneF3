document.addEventListener("DOMContentLoaded", function() {
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");
  const signupButton = document.getElementById("signup-button");
  const logoutButton = document.getElementById("logout-button");

  signupButton.addEventListener("click", function() {
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (fullname === "" || email === "" || password === "" || confirmPassword === "") {
      errorMessage.textContent = "All fields are mandatory";
      successMessage.textContent = "";
      errorMessage.style.display = "block";
      successMessage.style.display = "none";
    } else if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match";
      successMessage.textContent = "";
      errorMessage.style.display = "block";
      successMessage.style.display = "none";
    } else {
      const accessToken = generateAccessToken(); // Function to generate a random access token
      
      // Create user object with properties and access token
      const user = {
        fullname: fullname,
        email: email,
        password: password,
        accessToken: accessToken
      };

      // Save user state to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Show success message
      errorMessage.textContent = "";
      successMessage.textContent = "Successfully Signed up!";
      errorMessage.style.display = "none";
      successMessage.style.display = "block";

      // Redirect to profile page
      window.location.href = "./profile.html";
    }
  });


 // Check if the user is authenticated
 const userState = localStorage.getItem("user");
 if (!userState) {
   // If user state is not found, redirect to signup page
   window.location.href = "./index.html";
 } else {
   // Parse the user state from local storage
   const user = JSON.parse(userState);
   // Display user details on the profile page
   fullnameElement.textContent = user.fullname;
   emailElement.textContent = user.email;
 }

  logoutButton.addEventListener("click", function() {
    // Clear user state from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    // Redirect to signup page
    window.location.href = "./index.html";
  });

  const path = window.location.pathname;
  const isAuthenticated = checkAuthentication();

  if (path === "./profile.html") {
    if (!isAuthenticated) {
      window.location.href = "./index.html";
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      document.getElementById("fullname-profile").textContent = user.fullname;
      document.getElementById("email-profile").textContent = user.email;
      document.getElementById("password-profile").textContent = user.password;
    }
  } else if (path === "./index.html") {
    if (isAuthenticated) {
      window.location.href = "./profile.html";
    }
  }

  function generateAccessToken() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 16;
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }

  function checkAuthentication() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.accessToken;
  }
});
