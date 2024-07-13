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
import { getUserInfo } from "@/utils/auth";
import socket from "@/layouts/ChatLayout/components/socket";

function App() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <div className="app">
      <div className="app_content">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommend"
              element={
                <ProtectedRoute>
                  <RecommendPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFound />} />
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
