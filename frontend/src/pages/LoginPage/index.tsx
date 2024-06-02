import { Form } from "antd";

import Button from "@/components/Button";

import styles from "./index.module.scss";
import Input from "@/components/Input";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <div className={styles.coverImage}>
          <img
            src={require("@/assets/images/products/cover-image.png")}
            alt=""
          />
        </div>
        <h2 className={styles.loginTitle}>
          XH Book store
          <span className={styles.loginSubtitle}>XH Book store</span>
        </h2>
        <Form layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input placeholder="Username..." type="text" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input placeholder="Password" type="Password" />
          </Form.Item>

          <Button btnType="secondary" isRounded isFullWidth htmlType="submit">
            Login
          </Button>

          <Button btnType="primary" isRounded isFullWidth mt12>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
