import { ReactNode } from "react";

import LeftSide from "@/layouts/LeftSide";
import RightSide from "@/layouts/RightSide";

import styles from "./index.module.scss";

interface IMainLayoutProps {
  children: ReactNode;
}

function MainLayout(mainLayoutProps: IMainLayoutProps) {
  return (
    <>
      <div className={styles.mainLayout}>
        <LeftSide />
        <div style={{ width: "720px", maxWidth: "720px" }}>
          {mainLayoutProps.children}
        </div>
        <RightSide />
      </div>
    </>
  );
}

export default MainLayout;
