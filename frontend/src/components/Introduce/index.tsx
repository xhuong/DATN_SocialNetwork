import { ReactNode } from "react";
import styles from "./index.module.scss";

type IIntroduce = {
  heading: string;
  desc: string;
  icon: ReactNode;
};

export default function Introduce({ heading, desc, icon }: IIntroduce) {
  return (
    <div className={styles.introduce}>
      <span className={styles.introduceIcon}>{icon}</span>
      <div className={styles.introduceContent}>
        <h2 className={styles.introduceHeading}>{heading}</h2>
        <p className={styles.introduceParagraph}>{desc}</p>
      </div>
    </div>
  );
}
