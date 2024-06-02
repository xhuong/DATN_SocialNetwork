import { ReactNode } from "react";

import Container from "@/layouts/Container";

import { FaBook } from "react-icons/fa";

import styles from "./index.module.scss";

type Props = {
  children: ReactNode;
  isGrayBg?: boolean;
  title: string;
  subTitle: string;
};

export default function Section(props: Props) {
  const { children, isGrayBg, title, subTitle } = props;
  return (
    <div className={styles.section}>
      <Container>
        <h2 className={`${styles.sectionTitle}`}>
          {title}
          <span className={styles.sectionSubtitle}>{subTitle}</span>
          <FaBook />
        </h2>
        {children}
      </Container>
    </div>
  );
}
