import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { ModalProps } from "antd";

import { closeModal } from "@/redux/slices/modal";

import { CiCircleRemove } from "react-icons/ci";

import styles from "./index.module.scss";

interface IModalProps extends ModalProps {
  isShow: boolean;
  children: ReactNode;
  title: string;
  button?: ReactNode;
  isRounded?: boolean;
}

function Modal({
  isShow = false,
  children,
  title,
  button,
  isRounded,
}: IModalProps) {
  const dispatch = useDispatch();
  return (
    <div className={`${styles.modal} ${isShow ? styles.showModal : ""}`}>
      <div
        className={`${styles.modalContainer} ${
          isRounded ? styles.rounded : ""
        }`}
      >
        <div className={styles.modalHeading}>
          <p className={styles.modalTitle}>{title}</p>
          <span
            className={styles.modalCloseIcon}
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            <CiCircleRemove />
          </span>
        </div>
        <div className={styles.modalContent}>{children}</div>
        {button && <div className={styles.modalFooter}>{button}</div>}
      </div>
    </div>
  );
}

export default Modal;
