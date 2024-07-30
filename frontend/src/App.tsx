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
import ContactPage from "@/pages/ContactPage";

import Loading from "@/components/Loading";
import { routerPaths } from "./constant";

function App() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

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
            <Route
              path={routerPaths.contactPage}
              element={
                <ProtectedRoute>
                  <ContactPage />
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
