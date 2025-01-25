document.getElementById('sendBtn').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim()) {
        // Display user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = userInput;
        document.getElementById('messages').appendChild(userMessage);
        
        // Display bot response
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.textContent = "You said: " + userInput;
        document.getElementById('messages').appendChild(botMessage);
        
        // Scroll to bottom of messages
        const messagesDiv = document.getElementById('messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Clear input field
        document.getElementById('userInput').value = '';
    }
});
