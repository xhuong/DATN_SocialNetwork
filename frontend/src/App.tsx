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
