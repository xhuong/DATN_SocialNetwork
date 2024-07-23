import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, Row } from "antd";

import { RootState } from "@/redux/store";
import { closeChatModal } from "@/redux/slices/chat";
import { getUserInfo } from "@/utils/auth";

import User from "@/layouts/ChatLayout/components/User";
import MessagePanel from "@/layouts/ChatLayout/components/MessagePanel";

import socket from "../socket";

import {
  useLazyGetFollowerUsersQuery,
  useLazyGetFollowingUsersQuery,
} from "@/services/FollowAPI";
import {
  useLazyGetAllMessageFromConversationQuery,
  useLazySaveMessageQuery,
} from "@/services/ChatAPI";
import { IReceviedMessageBE } from "@/utils/chat";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/utils/constant";

import styles from "./index.module.scss";

interface IMessage {
  content: string;
  fromSelf: boolean;
}

interface IUserChat {
  socketId: string;
  username: string;
  userId: number;
  connected?: boolean;
  hasNewMessages?: boolean;
  messages: IMessage[];
}

interface ISelectedUser extends IUserChat {
  self: boolean;
}

const mapMessagesBEToMessagesFE = (
  messages: IReceviedMessageBE[]
): IMessage[] => {
  return messages.map((message) => ({
    content: message.message_text,
    fromSelf: message.is_own_message,
  }));
};

const Chat = () => {
  const userInfo = getUserInfo();
  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.chatModal.isShow);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<IUserChat[]>([]);

  const [saveMessages] = useLazySaveMessageQuery();
  const [getFollowers] = useLazyGetFollowerUsersQuery();
  const [getFollowingUsers] = useLazyGetFollowingUsersQuery();
  const [getMessages] = useLazyGetAllMessageFromConversationQuery({
    refetchOnFocus: true,
  });

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
        sendFromUser: userInfo.id,
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

  const onSelectUser = async (user: ISelectedUser) => {
    console.log("🚀 ~ onSelectUser ~ user:", user);
    // calling api to retrieved messages from server

    // user.messages = [...mapMessagesBEToMessagesFE(messages || [])];
    if (!user?.self) {
      const messages = await getMessages({
        sender_user_id: userInfo.id,
        second_user_id: user.userId,
      }).then((res) => {
        return res.data?.result.data;
      });
      user.messages = [...mapMessagesBEToMessagesFE(messages || [])];
    }
    setTimeout(() => {
      setSelectedUser(user);
    });
    // user.hasNewMessages = false;
  };

  const handleSendImage = async (e: any) => {
    const file = e.target.files[0];

    // upload to server
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const response: any = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          body: formData,
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          // sending image url via socket
          if (selectedUser) {
            const content = res.url;
            socket.emit("private message", {
              content,
              // to: selectedUser.userID,
              to: selectedUser.socketId,
              sendFromUser: userInfo.id,
              receivedUserId: selectedUser.userId,
            });

            setSelectedUser((prevSelectedUser: any) => ({
              ...prevSelectedUser,
              messages: [
                ...prevSelectedUser.messages,
                { content, fromSelf: true },
              ],
            }));

            const cloneUsers = [...users];
            const data: any = cloneUsers.map((user: any) => {
              // if (user?.userID === selectedUser.userID) {
              if (user?.socketId === selectedUser.socketId) {
                return {
                  ...user,
                  messages: [
                    ...selectedUser.messages,
                    { content, fromSelf: true },
                  ],
                };
              } else {
                return user;
              }
            });
            setUsers(data);
          }
        });
    } catch (error) {
      throw new Error(`[CLIENT] [CHAT] error when uploading image: ${error}`);
    }
  };

  useEffect(() => {
    if (userInfo?.name && userInfo?.id) {
      socket.auth = { username: userInfo.name, userId: userInfo.id };
      socket.connect();
    }
  }, []);

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

    // both users follow the last one then they can sending message
    socket.on("users", async (usersFromServer) => {
      console.log("[CLIENT] [USERS EVENT] usersFromServer", usersFromServer);

      // const userInfo = getUserInfo();
      // const userServerIds = usersFromServer.map((u: any) => u.userId);

      // users followed me
      // const followersIds = await getFollowers({ id: userInfo.id }).then(
      //   (data) => data?.data?.result.data.map((user) => user.id)
      // );

      // users I followed
      // const followingIds = await getFollowingUsers({ id: userInfo.id }).then(
      //   (data) => data?.data?.result?.data?.map((user: any) => user.user_id)
      // );

      // console.log("🚀 ~ socket.on ~ followersIds:", followersIds);
      // console.log("🚀 ~ socket.on ~ followingIds:", followingIds);
      // console.log("🚀 ~ socket.on ~ userServerIds:", userServerIds);

      // get users has been followed me
      // const followedIdsInUserServer = followersIds?.filter((followerId) =>
      //   userServerIds.includes(followerId)
      // );
      // console.log(
      //   "🚀 ~ socket.on ~ followedIdsInUserServer:",
      //   followedIdsInUserServer
      // );

      // const ids = followingIds?.filter((followingId) =>
      //   followedIdsInUserServer?.some(
      //     (followedId) => followedId === followingId
      //   )
      // );

      // console.log("[CLIENT] [users event] match ids:", ids);

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

    // lắng nghe khi có người dùng mới connect tới server
    socket.on("user connected", (user) => {
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

    // lắng nghe sự kiện nhận được private message
    socket.on(
      "private message",
      async ({ content, from, sendFromUser, receivedUserId }) => {
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

        // save message to DB
        try {
          await saveMessages({
            message_text: content,
            send_user_id: sendFromUser,
            received_user_id: receivedUserId,
            send_datetime: "2024-06-16T15:46:26.023Z",
          });
          console.log("Saved message to DB ✨");
        } catch (err) {
          console.log("Error when saving message to DB: ", err);
        }
      }
    );

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
                selected={user?.userId === selectedUser?.userId}
                onSelect={() => onSelectUser(user)}
              />
            </Fragment>
          ))}
        </Col>
        <Col sm={18} xl={18}>
          {selectedUser && (
            <MessagePanel
              user={selectedUser}
              onMessage={onMessage}
              handleSendImage={handleSendImage}
            />
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
