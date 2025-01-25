document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {  // Example login check
        // Redirect to main page after successful login
        window.location.href = 'chatbot.html'; // Assuming chatbot.html is your main page
    } else {
        alert('Invalid username or password');
    }
});
