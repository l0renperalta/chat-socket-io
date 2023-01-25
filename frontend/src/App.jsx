import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
const socket = io('http://localhost:7000');

function App() {
   const [message, setMessage] = useState('');
   const [messages, setMessages] = useState([]);

   const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit('message', message);
      const newMessage = {
         message: message,
         from: 'Me',
      };
      setMessages([newMessage, ...messages]);
      setMessage('');
   };

   useEffect(() => {
      const receiveMessage = (message) => {
         setMessages([message, ...messages]);
      };

      socket.on('message', receiveMessage);

      return () => {
         socket.off('message', receiveMessage);
      };
   }, [messages]);

   return (
      <div className="App">
         <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
            <button>send</button>
         </form>
         {messages.map((e, index) => (
            <div key={index}>
               {e.from}: {e.message}
            </div>
         ))}
      </div>
   );
}

export default App;
