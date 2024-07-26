import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Countdown from "@/components/CountDown";

import { hideLoading, showLoading } from "@/redux/slices/loading";
import { IUserBEOmitId } from "@/utils/user";

import { useCreateNewUserMutation } from "@/services/UserAPI";
import { DEFAULT_AVATAR } from "@/pages/constant";

import styles from "./index.module.scss";
interface IAddUserFormValue {
  name: string;
  username: string;
  password: string;
  phone: string;
  address: string;
}

function RegisterPage() {
  const COUNTDOWN_TIME = 5;
  const NORMAL_USER_ROLE = 2;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createNewUser, { isSuccess }] = useCreateNewUserMutation();
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);

  const onSubmit = useCallback(async (values: IAddUserFormValue) => {
    try {
      dispatch(showLoading());
      const payload: IUserBEOmitId = {
        name: values.name,
        user_name: values.username,
        password: values.password,
        phone_number: values.phone,
        address: values.address,
        image_profile: DEFAULT_AVATAR,
        role_id: NORMAL_USER_ROLE,
      };
      await createNewUser(payload)
        .then(() => toast("You have create new account successfully ✨"))
        .catch((err) => toast.error(`Oop! Something went wrong: ${err}`));
    } catch (error) {
    } finally {
      dispatch(hideLoading());
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      if (!countdown) {
        clearInterval(interval);
        navigate("/login");
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [isSuccess, countdown]);

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.registerPageContent}>
          <div className={styles.registerDescription}>
            <h2>Social Network</h2>
            <p>
              Create a new account to discover a lot of interestings in our
              application
            </p>
          </div>

          <div className={styles.registerForm}>
            <h2 className={styles.registerTitle}>
              Social Network
              <span className={styles.registerSubtitle}>Social Network</span>
            </h2>
            <Countdown
              time={5}
              showIcon
              type="success"
              message="Redirecting you to login page in"
              redirectURL="/login"
              startCounting={isSuccess}
              className={styles.countdown}
            />
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label="Your name"
                name="name"
                rules={[
                  { required: true, message: "Please input your full name" },
                ]}
              >
                <Input placeholder="Your full name..." type="text" />
              </Form.Item>
              <Form.Item
                label="Your phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone number" },
                ]}
              >
                <Input placeholder="Your phone number..." type="text" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your user name" },
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
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address" },
                ]}
              >
                <Input placeholder="Address..." type="text" />
              </Form.Item>

              <Button
                btnType="secondary"
                isRounded
                isFullWidth
                htmlType="submit"
              >
                Register
              </Button>

              <Button
                btnType="primary"
                isRounded
                isFullWidth
                mt12
                onClick={() => navigate("/login")}
              >
                Go back to login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
