import { Modal, ModalProps } from "antd";

function ViewImageListModal(props: ModalProps) {
  return <Modal {...props}>{props.children}</Modal>;
}

export default ViewImageListModal;
