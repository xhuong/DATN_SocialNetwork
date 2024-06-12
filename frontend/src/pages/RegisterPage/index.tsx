import { Form } from "antd";

import Button from "@/components/Button";
import Input from "@/components/Input";

import styles from "./index.module.scss";

function RegisterPage() {
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
            <Form
              layout="vertical"
              onFinish={(values) => {
                console.log(values);
              }}
            >
              <Form.Item
                label="Your full name"
                name="fullName"
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
                label="User name"
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

              <Button btnType="primary" isRounded isFullWidth mt12>
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
