import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, Row } from "antd";

import { RootState } from "@/redux/store";
import { closeChatModal } from "@/redux/slices/chat";

import User from "@/layouts/ChatLayout/components/User";
import MessagePanel from "@/layouts/ChatLayout/components/MessagePanel";

import socket from "../socket";

import styles from "./index.module.scss";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any>([]);
  const show = useSelector((state: RootState) => state.chatModal.isShow);
  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(closeChatModal());
  };
  const onMessage = (content: string) => {
    if (selectedUser) {
      console.log("[CLIENT] onMessage event: selectedUser", selectedUser);
      socket.emit("private message", {
        content,
        // to: selectedUser.userID,
        to: selectedUser.socketId,
        receivedUserId: selectedUser.userId,
      });

      setSelectedUser((prevSelectedUser: any) => ({
        ...prevSelectedUser,
        messages: [...prevSelectedUser.messages, { content, fromSelf: true }],
      }));

      const cloneUsers = [...users];
      const data: any = cloneUsers.map((user: any) => {
        // if (user?.userID === selectedUser.userID) {
        if (user?.socketId === selectedUser.socketId) {
          return {
            ...user,
            messages: [...selectedUser.messages, { content, fromSelf: true }],
          };
        } else {
          return user;
        }
      });
      setUsers(data);
    }
  };

  const onSelectUser = (user: any) => {
    setSelectedUser(user);
    user.hasNewMessages = false;
  };

  useEffect(() => {
    const initReactiveProperties = (user: any) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("connect", () => {
      console.log("[CLIENT] [connect event]");
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (user.self) {
            return { ...user, connected: true };
          }
          return user;
        })
      );
    });

    socket.on("disconnect", () => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (user.self) {
            return { ...user, connected: false };
          }
          return user;
        })
      );
    });

    socket.on("users", (usersFromServer) => {
      console.log("🚀 ~ socket.on ~ usersFromServer:", usersFromServer);
      const updatedUsers = usersFromServer.map((user: any) => {
        // const isSelf = user.userID === socket.id;
        const isSelf = user.socketId === socket.id;
        return {
          ...user,
          self: isSelf,
          connected: isSelf ? socket.connected : true,
          messages: [],
          hasNewMessages: false,
        };
      });

      updatedUsers.sort((a: any, b: any) => {
        if (a.self) return -1;
        if (b.self) return 1;
        return a.username.localeCompare(b.username);
      });

      setUsers(updatedUsers);
    });

    socket.on("user connected", (user) => {
      console.log(`[CLIENT] [user connected event] user: ${user}`);
      initReactiveProperties(user);
      setUsers((prevUsers: any) => [...prevUsers, user]);
    });

    socket.on("user disconnected", (id) => {
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          // user.userID === id ? { ...user, connected: false } : user
          user.socketId === id ? { ...user, connected: false } : user
        )
      );
    });

    socket.on("private message", ({ content, from }) => {
      console.log("selectedUser", selectedUser);
      // if (selectedUser?.userID === from)
      if (selectedUser?.socketId === from)
        setSelectedUser({
          ...selectedUser,
          messages: [...selectedUser.messages, { content, fromSelf: false }],
        });

      setUsers((prevUsers: any) => [
        ...prevUsers.map((user: any) => {
          // if (user.userID === from) {
          if (user.socketId === from) {
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
        }),
      ]);
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
                // key={user.userID}
                key={user.socketId}
                user={user}
                // selected={user?.userID === selectedUser?.userID}
                selected={user?.socketId === selectedUser?.socketId}
                onSelect={() => onSelectUser(user)}
              />
            </Fragment>
          ))}
        </Col>
        <Col xl={18}>
          {selectedUser && (
            <MessagePanel user={selectedUser} onMessage={onMessage} />
          )}
        </Col>
      </Row>
    </Modal>

    // <div>
    //   <div className="left-panel">
    //     {users.map((user) => (
    //       <User
    //         // key={user.userID}
    //         key={user.socketId}
    //         user={user}
    //         // selected={user?.userID === selectedUser?.userID}
    //         selected={user?.socketId === selectedUser?.socketId}
    //         onSelect={() => onSelectUser(user)}
    //       />
    //     ))}
    //   </div>
    //   <div className="right-panel">
    //     {selectedUser && (
    //       <MessagePanel user={selectedUser} onMessage={onMessage} />
    //     )}
    //   </div>
    // </div>
  );
};

export default Chat;
