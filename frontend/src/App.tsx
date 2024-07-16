import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "@/layouts/ProtectedRoute";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import RecommendPage from "@/pages/RecommendPage";
import ProfilePage from "@/pages/ProfilePage";
import PageNotFound from "@/pages/PageNotFound";

import Loading from "@/components/Loading";
import { routerPaths } from "./constant";
// import socket from "./socket.js";
// import { getUserInfo } from "./utils/auth";

function App() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  // const userInfo = getUserInfo();

  // useEffect(() => {
  //   if (userInfo) {
  //     socket.auth = { username: userInfo.name, userId: userInfo.id };
  //     socket.connect();
  //   }
  // }, [userInfo]);

  return (
    <div className="app">
      <div className="app_content">
        <Router>
          <Routes>
            <Route
              path={routerPaths.homePage}
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={routerPaths.recommendPage}
              element={
                <ProtectedRoute>
                  <RecommendPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={routerPaths.profilePage}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path={routerPaths.loginPage} element={<LoginPage />} />
            <Route path={routerPaths.registerPage} element={<RegisterPage />} />
            <Route path={routerPaths.pageNotFound} element={<PageNotFound />} />
            <Route path={routerPaths.page404} element={<PageNotFound />} />
          </Routes>
        </Router>
        <ToastContainer />
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import SelectUsername from "@/layouts/ChatLayout/components/SelectedUserName";
// import Chat from "@/layouts/ChatLayout/components/Chat";
// import socket from "@/layouts/ChatLayout/components/socket";

// const App = () => {
//   const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

//   useEffect(() => {
//     const handleConnectError = (err: any) => {
//       if (err.message === "invalid username") {
//         setUsernameAlreadySelected(false);
//       }
//     };

//     socket.on("connect_error", handleConnectError);

//     return () => {
//       socket.off("connect_error", handleConnectError);
//     };
//   }, []);

//   const onUsernameSelection = (username: string, userId: number) => {
//     setUsernameAlreadySelected(true);
//     socket.auth = { username, userId };
//     socket.connect();
//   };

//   return (
//     <div id="app">
//       {!usernameAlreadySelected ? (
//         <SelectUsername onUsernameSelected={onUsernameSelection} />
//       ) : (
//         <Chat />
//       )}
//     </div>
//   );
// };

// export default App;
