import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Chat.css";

import { post } from "./../../services/httpClientService";

enum MessageType {
  Client,
  Assistant,
}

interface Message {
  text: string;
  type: MessageType;
}

interface PostMessageDTO {
  textMessage: string;
}
interface PostMessageResponseDTO {
  responseText: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [buttonDisabled, setButtonDisable] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setButtonDisable(true);

    post<PostMessageDTO, PostMessageResponseDTO>(
      "api/AI/assistant/post-message",
      {
        textMessage: message,
      }
    ).then((value: PostMessageResponseDTO) => {
      setMessages([
        ...messages,
        { text: message, type: MessageType.Client },
        { text: value.responseText, type: MessageType.Assistant },
      ]);
      setMessage("");
      setButtonDisable(false);
    });
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, index) => (
          <div
            key={index}
            className={MessageType[m.type].toLowerCase() + "-message message"}
          >
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={buttonDisabled}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
