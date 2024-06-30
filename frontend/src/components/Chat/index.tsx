import { useEffect, useState } from "react";
import { Input } from "antd";
import { MdOutlineClose } from "react-icons/md";

import girl from "@/assets/images/users/girl.jpg";
import Button from "@/components/Button";
import UserProfile from "@/components/UserProfile";
import { IoIosSend } from "react-icons/io";

import { useGetAllMessageFromConversationQuery } from "@/services/ChatAPI";
import { IReceviedMessageFE, mapMessagesBEToMessageFE } from "@/utils/chat";

import styles from "./index.module.scss";

function ChatWindow() {
  const { data, isSuccess } = useGetAllMessageFromConversationQuery({
    conversation_id: 1,
    sender_user_id: 2,
  });
  const [chatData, setChatData] = useState<IReceviedMessageFE[]>([]);

  useEffect(() => {
    if (data && isSuccess) {
      const convertedData = mapMessagesBEToMessageFE(data.result.data);
      setChatData(convertedData);
    }
  }, [data, isSuccess]);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeading}>
        <div className={styles.profile}>
          <UserProfile userDisplayName="Xuân Trường" image={girl} isRounded />
        </div> 
        <div className={styles.chatHeadingAction}>
          <span className={styles.closeChatWindow}>
            <MdOutlineClose size={18} />
          </span>
        </div>
      </div>
      <div className={styles.chatBody}>
        <ul>
          {chatData.map((message) => (
            <li
              className={`${styles.chatInfo} ${
                message.isOwnMessage ? styles.myMessage : ""
              }`}
            >
              <div className={styles.chatAvatar}>
                <img src={girl} alt="" />
              </div>
              <p className={styles.chatMessage}>{message.messageText}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatFooter}>
        <Input.TextArea autoSize />
        <div className={styles.sendButton}>
          <Button
            btnType="secondary"
            isRounded
            isFullWidth
            isNonePadding
            htmlType="submit"
            onClick={() => {}}
          >
            <IoIosSend size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ChatWindow;
