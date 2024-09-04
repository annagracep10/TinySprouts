import React, { useState } from 'react';
import "../styles/ChatBot.css";

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage = { user: input, bot: '...' };
        setMessages([...messages, newMessage]);

        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            setMessages((prevMessages) =>
                prevMessages.map((msg, index) =>
                    index === prevMessages.length - 1
                        ? { ...msg, bot: data.reply }
                        : msg
                )
            );
        } catch (error) {
            setMessages((prevMessages) =>
                prevMessages.map((msg, index) =>
                    index === prevMessages.length - 1
                        ? { ...msg, bot: 'Sorry, something went wrong.' }
                        : msg
                )
            );
        } finally {
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h3>Chat with Sprouts</h3>
            </div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <div className="user-message">
                            <strong>You:</strong> {msg.user}
                        </div>
                        <div className="bot-message">
                            <strong>Bot:</strong> {msg.bot}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    autoFocus
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
}

export default ChatBot;
