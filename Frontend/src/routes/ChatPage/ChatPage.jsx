import "./chatPage.css";
import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewPrompt from "../../components/newPrompt/NewPrompt";

const ChatPage = () => {
  const chatRef = useRef(null);
  const { chatId } = useParams();
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="chat" ref={chatRef}>
          <NewPrompt chatContainerRef={chatRef} chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;