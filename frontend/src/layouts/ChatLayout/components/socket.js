import { increaseCount } from "@/redux/slices/notification";
import { getUserInfo } from "@/utils/auth";
import store from "@/redux/store";
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

const userInfo = getUserInfo();

socket.onAny((event, ...args) => {
  console.log("event", event, ...args);
  if (args[0]?.receivedUserId === userInfo.id) {
    console.log("OK");
    store.dispatch(increaseCount());
  }
});

export default socket;
