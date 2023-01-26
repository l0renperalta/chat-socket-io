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
      <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
         <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
            <h1 className="chat-2x1 font-bold my-2">Whasap</h1>
            <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} className="border-2 border-zinc-500 p-2 text-black w-full" />
            <ul className="h-80 overflow-y-auto">
               {messages.map((e, index) => (
                  <li key={index} className={`my-2 p-2 text-sm rounded-md table ${e.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-indigo-500'}`}>
                     {e.from}: {e.message}
                  </li>
               ))}
            </ul>
         </form>
      </div>
   );
}

export default App;
