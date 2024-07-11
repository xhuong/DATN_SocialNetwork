import { Input } from "antd";
import styles from "./index.module.scss";
import girl from "@/assets/images/users/girl.jpg";
import Button from "@/components/Button";
import { IoIosSend } from "react-icons/io";
import UserProfile from "@/components/UserProfile";

interface IMessagePanel {
  selectedUser: any;
  onSendMessage: (content: string, image: any) => void;
}

function MessagePanel({ selectedUser, onSendMessage }: IMessagePanel) {
  const chatData = [
    {
      id: 1,
      send_user_id: 2,
      message_text: "1231232",
      send_datetime: "2024-06-16T15:46:26.023Z",
      conversation_id: 1,
      is_own_message: true,
    },
    {
      id: 2,
      send_user_id: 3,
      message_text: "asdasd ajksdhjk",
      send_datetime: "2024-06-16T15:46:26.023Z",
      conversation_id: 1,
      is_own_message: false,
    },
  ];
  return (
    <>
      <UserProfile
        isActive
        isRounded
        image={girl}
        userDisplayName="Xuân Hướng"
        borderBottom
      />

      <div className={styles.chatBody}>
        <ul>
          {chatData.map((message) => (
            <li
              className={`${styles.chatInfo} ${
                message.is_own_message ? styles.myMessage : ""
              }`}
            >
              <div className={styles.chatAvatar}>
                <img src={girl} alt="" />
              </div>
              <p className={styles.chatMessage}>{message.message_text}</p>
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
    </>
  );
}

export default MessagePanel;
