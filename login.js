document.addEventListener('DOMContentLoaded', () => {

    const formTitle = document.getElementById('form-title');
    const customerForm = document.getElementById('customer-form');
    const signupFields = document.getElementById('signup-fields');
    const confirmPasswordField = document.getElementById('confirm-password-field');
    const submitButton = document.getElementById('submit-button');
    const toggleFormLink = document.getElementById('toggle-form-link');
    const errorMessage = document.getElementById('error-message');

    let isLoginMode = true;

    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('nexoraUser'));
    if (user) {
        // If logged in, redirect them to the home page
        window.location.href = 'index.html';
        return; // Stop further execution
    }

    // Function to toggle between Login and Sign Up forms
    function toggleFormMode() {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            formTitle.textContent = 'Customer Login';
            submitButton.textContent = 'Login';
            toggleFormLink.textContent = 'New user? Sign Up';
            signupFields.classList.add('hidden-signup-fields');
            confirmPasswordField.classList.add('hidden-signup-fields');
        } else {
            formTitle.textContent = 'Create an Account';
            submitButton.textContent = 'Sign Up';
            toggleFormLink.textContent = 'Already a member? Login';
            signupFields.classList.remove('hidden-signup-fields');
            confirmPasswordField.classList.remove('hidden-signup-fields');
        }
        errorMessage.style.display = 'none';
        customerForm.reset();
    }

    // Event listener for form submission
    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        if (isLoginMode) {
            // For login, we would typically check against a database on a server.
            // For this client-side demo, we'll just save the credentials.
            // In a real app, this is where you'd send an API request to log in.
            console.log('Login attempt with:', {
                name: nameInput.value, // Name is not used in login, but kept for consistency
                email: emailInput.value,
                password: passwordInput.value
            });
            localStorage.setItem('nexoraUser', JSON.stringify({
                name: "Guest", // Mocking a guest user for login
                email: emailInput.value
            }));
            window.location.href = 'index.html';
        } else {
            // Sign Up mode
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match.';
                errorMessage.style.display = 'block';
                return;
            }

            // In a real application, you would send this to a server for account creation.
            console.log('Sign Up attempt with:', {
                name: nameInput.value,
                email: emailInput.value,
                password: password
            });

            // For this demo, we save the new user info to local storage.
            localStorage.setItem('nexoraUser', JSON.stringify({
                name: nameInput.value,
                email: emailInput.value
            }));

            // Redirect after successful sign up
            window.location.href = 'index.html';
        }
    });

    // Event listener for the toggle link
    toggleFormLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFormMode();
    });
});
