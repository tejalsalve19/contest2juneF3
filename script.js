// Helper function to generate a random 16-byte access token
function generateAccessToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }
  
  // Function to save user data in local storage
  function saveUserState(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  // Function to retrieve user data from local storage
  function getUserState() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  // Function to clear user data from local storage
  function clearUserState() {
    localStorage.removeItem('user');
  }
  
  // Function to redirect to a specific page
  function redirectToPage(page) {
    window.location.href = page;
  }
  
  // Function to check if the user is authenticated
  function isAuthenticated() {
    const user = getUserState();
    return user && user.accessToken;
  }
  
  // Function to display user details on the profile page
  function displayUserProfile() {
    const user = getUserState();
    const profileDetails = document.getElementById('profile-details');
    profileDetails.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
  }
  
  // Function to handle signup form submission
  function handleSignupFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Validate form inputs
    if (!name || !email || !password || !confirmPassword) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Error: All fields are mandatory.';
      return;
    }
  
    if(password !== confirmPassword){
      const errorMessage=document.getElementById('error-message');
      errorMessage.textContent='Error:Passowrds do not match.'
      return;
    }


    // Generate access token
    const accessToken = generateAccessToken();
  
    // Save user state in local storage
    const user = {
      name,
      email,
      password,
      accessToken
    };
    saveUserState(user);
  
// Clear form inputs
document.getElementById('name').value = '';
document.getElementById('email').value = '';
document.getElementById('password').value = '';
document.getElementById('confirm-password').value = '';

// Clear error message
const errorMessage = document.getElementById('error-message');
errorMessage.textContent = '';


    // Display success message and redirect to profile page
    const successMessage = document.getElementById('success-message');
    sucessMessage.textContent = 'Successfully Signed Up!';
    const successMessage = document.createElement('p');
    successMessage.classList.add('success-message');
    successMessage.textContent = 'Signup successful! Redirecting to profile...';
    document.getElementById('signup-form').appendChild(successMessage);
    setTimeout(() => {
      redirectToPage('./profile.html');
    }, 2000);
  }
  
  // Function to handle logout button click
  function handleLogout() {
    // Clear user state and redirect to signup page
    clearUserState();
    redirectToPage('./index.html');
  }
  
  // Check if the user is authenticated
  if (isAuthenticated()) {
    // If authenticated, display profile page
    if(window.location.pathname.includes('./index.html')){
      redirectToPage('./profile.html');
    }
  } else {
    // If not authenticated, display signup page
    // redirectToPage('./index.html');
    if(window.location.pathname.includes('./profile.html')){
      redirectToPage('./profile.html');
    }
    displayUserProfile();
  }
  
// function to display user details on the profile page
function displayUserProfile(){
  const user=getUserState();
  document.getElementById('profile-name').textContent=user.name;
  document.getElementById('profile-email').textContent=user.email;
}


  // Event listeners
  document.getElementById('signup-form').addEventListener('submit', handleSignupFormSubmit);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  