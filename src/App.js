import React, { useState } from "react";
import { useEffect, useRef } from "react";
import "./App.css";
import Chat from "./components/Chat";
import messagesquareIcon from "@iconify/icons-lucide/message-square";
import Icon from "./daisyui/components/Icon";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const showElement = () => {
    setIsVisible(true);
  };

  // Function to hide the element
  const hideElement = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <button
        className="fixed bottom-6 right-6 btn btn-circle btn-primary btn-lg shadow-lg close-chat"
        onClick={showElement}
      >
        <Icon icon={messagesquareIcon} fontSize={24} className="text-white" />
      </button>
      <div
        style={{ display: isVisible ? "block" : "none" }}
        className="fixed right-6 bottom-6 bg-base-100 shadow-xl rounded-2xl overflow-hidden"
      >
        <button
          className="chat-close absolute right-4 top-2 w-8 h-8"
          onClick={hideElement}
        ></button>
        <div className="chat-outer">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
