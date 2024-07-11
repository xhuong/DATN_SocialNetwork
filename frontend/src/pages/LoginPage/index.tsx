import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form } from "antd";

import { useLazyLoginQuery } from "@/services/AuthenticationAPI";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { getToken, isTokenValid } from "@/utils/auth";
import { ILoginPayloadFE, mapLoginPayloadFEToBE } from "@/utils/common";

import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/slices/loading";

function LoginPage() {
  const navigate = useNavigate();
  const [login] = useLazyLoginQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getToken();
    if (accessToken && isTokenValid(accessToken)) {
      navigate("/");
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
    }
  }, []);

  const handleSubmit = async (loginInfo: ILoginPayloadFE) => {
    try {
      dispatch(showLoading());
      const payload = mapLoginPayloadFEToBE(loginInfo);
      await login(payload).then((response: any) => {
        const { data } = response;
        if (data?.status === 400) {
          toast.error(data?.message, {
            autoClose: 5000,
            theme: "light",
          });
        }
        if (data?.status === 200) {
          toast.success(data?.message, {
            autoClose: 2000,
            theme: "light",
          });
          const { access_token, user_info } = data.result.data;
          if (access_token && user_info) {
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user_info", JSON.stringify(user_info));
          }
          navigate("/");
        }
      });
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginPageContent}>
          <div className={styles.loginDescription}>
            <h2>Social Network</h2>
            <p>
              This app helps you connect and share with the people in your life.
            </p>
          </div>
          <div className={styles.loginForm}>
            <div className={styles.coverImage}>
              <img
                src={require("@/assets/images/banners/banner-3.jpg")}
                alt=""
              />
            </div>
            <h2 className={styles.loginTitle}>
              Social Network
              <span className={styles.loginSubtitle}>Social Network</span>
            </h2>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username" },
                ]}
              >
                <Input placeholder="Username..." type="text" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
                <Input placeholder="Password" type="Password" />
              </Form.Item>

              <Button
                btnType="secondary"
                isRounded
                isFullWidth
                htmlType="submit"
              >
                Login
              </Button>

              <Button btnType="primary" isRounded isFullWidth mt12>
                Register
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
