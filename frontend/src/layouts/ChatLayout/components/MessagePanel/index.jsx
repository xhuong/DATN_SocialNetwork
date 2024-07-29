import { useState, useEffect, useRef } from "react";
import { Input } from "antd";

import defaultAvatar from "@/assets/images/users/default.png";
import UserProfile from "@/components/UserProfile";
import Button from "@/components/Button";

import { IoIosSend } from "react-icons/io";

import styles from "./index.module.scss";

const MessagePanel = ({ user, onMessage, handleSendImage }) => {
  const [inputKey, setInputKey] = useState(Date.now());
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(user.messages || []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim().length > 0) {
      const newMessage = { content: input, fromSelf: true };
      setMessages([...messages, newMessage]);
      onMessage(input);
      setInput("");
    }
  };

  const handleFileChange = (e) => {
    handleSendImage(e);
    setInputKey(Date.now());
  };

  useEffect(() => {
    setMessages(user.messages || []);
  }, [user.messages]);

  const displaySender = (message, index) => {
    return index === 0 || messages[index - 1].fromSelf !== message.fromSelf;
  };

  return (
    <>
      <UserProfile
        image={defaultAvatar}
        userDisplayName={user.username}
        isActive
        isRounded
        bgGray
      />

      <div className={styles.chatBody}>
        {messages.map((message, index) => (
          <div
            className={`${styles.message} ${
              message?.fromSelf ? styles.myMessage : ""
            }`}
            key={index}
          >
            {displaySender(message, index) && (
              <div className={styles.sender}>
                <div className={styles.avatar}>
                  <img src={defaultAvatar} alt={user.username} />
                </div>
              </div>
            )}
            <div
              className={`${styles.messageContent} ${
                message.content.includes("http") ? styles.imageContent : null
              }`}
            >
              {message.content.includes("http") ? (
                <img src={message.content} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatFooter}>
        <form onSubmit={handleSubmit} className={styles.chatForm}>
          <Input.TextArea
            autoSize={false}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <div className={styles.sendButton}>
            <Button
              btnType="secondary"
              isRounded
              isFullWidth
              isNonePadding
              htmlType="submit"
              onClick={() => {}}
            >
              <IoIosSend size={28} />
            </Button>
          </div>
        </form>
        <Input
          id="upload-photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          key={inputKey}
        />
      </div>
    </>
  );
};

export default MessagePanel;
