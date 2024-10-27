import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

// Simulated real-time  database
const simulateRealTimeDB = {
  messages: [],
  subscribe: (callback) => {
    setInterval(() => {
      callback(simulateRealTimeDB.messages);
    }, 1000);
  },
  addMessage: (message) => {
    simulateRealTimeDB.messages.push(message);
  },
};

export default function Chat() {
  const { user } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    simulateRealTimeDB.subscribe((updatedMessages) => {
      setMessages(updatedMessages);
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: user?.username || "You",
        text: newMessage,
        timestamp: new Date(),
      };
      simulateRealTimeDB.addMessage(message);
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Team Chat</h2>
      <div className="flex-1 overflow-y-auto mb-4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <span className="font-bold">{message.sender}: </span>
            <span>{message.text}</span>
            <span className="text-xs text-gray-500 ml-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded-r hover:bg-secondary transition-bg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
