import LeftSide from "@/layouts/LeftSide";
import RightSide from "@/layouts/RightSide";
import MiddleSide from "../MiddleSide";

import styles from "./index.module.scss";

function MainLayout() {
  return (
    <>
      <div className={styles.mainLayout}>
        <LeftSide />
        <MiddleSide />
        <RightSide />
      </div>
    </>
  );
}

export default MainLayout;
