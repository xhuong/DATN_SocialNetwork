import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { TiHome } from "react-icons/ti";

import styles from "./index.module.scss";

function PageNotFound() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageNotFound} style={{}}>
      <p className={styles.title}>Page not found | 404</p>
      <Button btnType="secondary" isRounded onClick={backToHome}>
        <TiHome /> Back to home
      </Button>
    </div>
  );
}

export default PageNotFound;
