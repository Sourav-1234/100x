function togglePassword() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log('Sign up attempted with:', { email, password });
    alert('Sign up functionality would be implemented here!');
}

function handleGoogleSignup() {
    console.log('Google sign up clicked');
    alert('Google OAuth would be implemented here!');
}