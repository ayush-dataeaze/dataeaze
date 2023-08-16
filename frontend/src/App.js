// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const addMessage = (role, content) => {
    setMessages(prevMessages => [...prevMessages, { role, content }]);
  };

  const handleUserInput = () => {
    if (userInput.trim() === '') return;

    addMessage('user', userInput);

    // Simulate API call to get assistant's response (replace with actual logic)
    const assistantResponse = 'Assistant response from simulated logic';

    addMessage('assistant', assistantResponse);

    setUserInput('');
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserInput();
    }
  };
   
  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <img src="dataease-logo.png" alt="Logo" style={{ width: '90px', height: '50px' }}/>
        </div>
      </div>

      {/* Title container */}
      <div className="title-container">
        <h1 className="title">RBI Credit Card compliance assistant</h1>
        <h2 className="subheader">Ask your query about Credit Card compliance, we will get the best relevant compliance guideline from RBI</h2>
      </div>

      {/* White space */}
      <div style={{ height: '50px' }}></div>

      {/* Chat container */}
      <div className="chat-container">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role}`} key={index}>
            <span className={`${message.role}-icon`} />
            {message.content}
          </div>
        ))}
      </div>

      {/* User input */}
      <div className="user-input">
        <input
          type="text"
          placeholder="Ask any question"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleInputKeyPress} // Handle Enter key press
        />
        <button onClick={handleUserInput}>Send</button>
      </div>
    </div>
  );
}

export default App;