
import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from hugchat import hugchat
from hugchat.login import Login
from hugchat.exceptions import ModelOverloadedError

app = Flask(__name__)
CORS(app)

# Read credentials from environment variables
USERNAME = "vishalkongari"
PASSWORD = "rH^Hd)4s^7*8uFB"

def get_chatbot():
    """Initialize the chatbot with login credentials."""
    try:
        sign = Login(USERNAME, PASSWORD)
        cookies = sign.login()
        chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
        return chatbot
    except Exception as e:
        raise RuntimeError(f"Failed to initialize HuggingChat: {str(e)}")

@app.route('/chat', methods=['POST'])
def chat():
    """Endpoint to handle chat messages."""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "Invalid input, 'message' is required"}), 400

        user_message = data['message']

        # Initialize the chatbot
        chatbot = get_chatbot()
        conversation_id = chatbot.new_conversation()
        chatbot.change_conversation(conversation_id)

        # Retry mechanism for handling overloaded models
        max_retries = 3
        for attempt in range(max_retries):
            try:
                bot_response = chatbot.chat(user_message)
                response_message = str(bot_response)
                return jsonify({"response": response_message})
            except ModelOverloadedError:
                if attempt < max_retries - 1:
                    time.sleep(2)  # Wait for 2 seconds before retrying
                else:
                    return jsonify({"error": "Model is overloaded. Please try again later."}), 503

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
