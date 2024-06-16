import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ProtectedRoute from "@/layouts/ProtectedRoute";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import Loading from "@/components/Loading";

import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
        <ToastContainer />
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default App;
