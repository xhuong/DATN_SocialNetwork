import { useState, useEffect, Fragment } from "react";
import { Col, Modal, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeChatModal } from "@/redux/slices/chat";
import User from "@/layouts/Chat/components/User";

import defaultImage from "@/assets/images/users/default.png";
import MessagePanel from "@/layouts/Chat/components/MessagePanel";

import socket from "./socket";

import styles from "./index.module.scss";

function Chat() {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [users, setUsers] = useState<any>([]);

  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.chatModal.isShow);

  const onCloseModal = () => {
    dispatch(closeChatModal());
  };

  useEffect(() => {
    const initReactiveProperties = (user: any) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("connect", () => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.self ? { ...user, connected: true } : user
        )
      );
    });

    socket.on("disconnect", () => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.self ? { ...user, connected: false } : user
        )
      );
    });

    socket.on("users", (newUsers) => {
      const sortedUsers = newUsers
        .map((user: any) => {
          const newUser = { ...user, self: user.userID === socket.id };
          initReactiveProperties(newUser);
          return newUser;
        })
        .sort((a: any, b: any) => {
          if (a.self) return -1;
          if (b.self) return 1;
          return a.username.localeCompare(b.username);
        });
      setUsers(sortedUsers);
    });

    socket.on("user connected", (user) => {
      const newUser = { ...user, connected: true };
      initReactiveProperties(newUser);
      setUsers((prevUsers: any) => [...prevUsers, newUser]);
    });

    socket.on("user disconnected", (id) => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.userID === id ? { ...user, connected: false } : user
        )
      );
    });

    // listening to receive message
    socket.on("private message", ({ content, from }) => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (user.userID === from) {
            const updatedMessages = [
              ...user.messages,
              { content, fromSelf: false },
            ];
            return {
              ...user,
              messages: updatedMessages,
              hasNewMessages: user === selectedUser ? false : true,
            };
          }
          return user;
        })
      );
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    };
  }, [selectedUser]);

  const onSelectUser = (user: any) => {
    setSelectedUser(user);
    user.hasNewMessages = false;
  };

  const onMessage = (content: any) => {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
        receivedUserId: selectedUser.userId,
      });
      const updatedMessages = [
        ...selectedUser.messages,
        { content, fromSelf: true },
      ];
      setSelectedUser({ ...selectedUser, messages: updatedMessages });
    }
  };

  return (
    <Modal
      open={show}
      centered
      destroyOnClose
      footer={null}
      width={1200}
      onCancel={onCloseModal}
      className={styles.chatModal}
    >
      <Row gutter={{ xl: 12 }} style={{ marginTop: "24px" }}>
        <Col xl={6} className={styles.leftPanel}>
          {users.map((user: any, index: number) => (
            <Fragment key={index}>
              <User
                avatarUrl={defaultImage}
                userDisplayName="AAA"
                hasNewMessage={true}
                isSelected={true}
                onSelect={() => onSelectUser(user)}
              />
            </Fragment>
          ))}
        </Col>
        <Col xl={18}>
          <MessagePanel selectedUser={selectedUser} onSendMessage={onMessage} />
        </Col>
      </Row>
    </Modal>
  );
}

export default Chat;
