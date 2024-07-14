import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { TiHome } from "react-icons/ti";

import pageNotFoundImg from "@/assets/images/pictures/404.png";

import styles from "./index.module.scss";

function PageNotFound() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageNotFound}>
      <div className={styles.imageWrapper}>
        <img src={pageNotFoundImg} alt="" />
      </div>
      <div className={styles.pageNotFoundInfo}>
        <p className={styles.title}>Page not found | 404</p>
        <Button btnType="secondary" isRounded onClick={backToHome} isFullWidth>
          <TiHome /> Back to home
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
