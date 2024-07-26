import { useEffect } from "react";
import {
  useLazyGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
} from "@/services/UserAPI";
import { Form, Input, Modal } from "antd";
import Button from "../Button";
import { getUserInfo } from "@/utils/auth";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/redux/slices/loading";
import { toast } from "react-toastify";

import styles from "./index.module.scss";

function EditProfileInfoModal({
  isShow,
  userId,
  onCancel,
}: {
  isShow: boolean;
  userId: number;
  onCancel: () => void;
}) {
  const userInfo = getUserInfo();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [getProfileInfo, { data, isSuccess }] = useLazyGetProfileInfoQuery();
  const [updateProfileInfo] = useUpdateProfileInfoMutation();

  const onSubmit = async (values: any) => {
    try {
      dispatch(showLoading());
      await updateProfileInfo({
        id: userInfo.id,
        updateProfileInfoDto: {
          name: values.name,
          address: values.address,
        },
      }).then(() => {
        toast("Update profile info successfully!");
        getProfileInfo({ userId: userInfo.id });
      });
    } catch (error) {
      throw new Error(`Error when update profile info, ${error}`);
    } finally {
      dispatch(hideLoading());
      onCancelModal();
    }
  };

  const onCancelModal = () => {
    onCancel();
    form.resetFields();
  };

  useEffect(() => {
    isShow && getProfileInfo({ userId });
  }, [isShow]);

  useEffect(() => {
    if (data && isSuccess) {
      const convertData = {
        name: data.name,
        address: data.address,
      };
      form.setFieldsValue(convertData);
    }
  }, [data, isSuccess, form, isShow]);

  return (
    <Modal
      open={isShow}
      destroyOnClose
      footer={null}
      onCancel={onCancelModal}
      className={styles.editProfileInfoModal}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name !" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address !" }]}
        >
          <Input type="text" />
        </Form.Item>
        {/* <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number !" },
          ]}
        >
          <Input type="text" />
        </Form.Item> */}
        {/* <Form.Item
          label="Upload avatar"
          name="avatar"
          rules={[{ required: true, message: "Please upload your photo !" }]}
        >
          <Input type="file" accept="image/*" />
        </Form.Item> */}
        <Button
          btnType="secondary"
          isRounded
          isFullWidth
          mt12
          htmlType="submit"
        >
          Save
        </Button>
      </Form>
    </Modal>
  );
}

export default EditProfileInfoModal;
