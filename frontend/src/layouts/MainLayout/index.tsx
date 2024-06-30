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
        {mainLayoutProps.children}
        <RightSide />
      </div>
    </>
  );
}

export default MainLayout;
