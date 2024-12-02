import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        message: input,
      });

      const botMessage = { role: 'assistant', content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
    } finally {
      setInput('');
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.role === 'user' ? styles.userMessage : styles.botMessage),
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '300px',
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.6)',
  },
  chatWindow: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '10px',
    borderBottom: '1px solid #444',
  },
  message: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    color: '#fff',
  },
  userMessage: {
    backgroundColor: '#5a5a5a',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#2b2b2b',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: '#fff',
  },
  sendButton: {
    padding: '10px 20px',
    marginLeft: '10px',
    backgroundColor: '#5a5a5a',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Chatbot;
