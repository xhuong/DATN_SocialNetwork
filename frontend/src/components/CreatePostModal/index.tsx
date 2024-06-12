import Modal from "@/components/Modal";

import Button from "@/components/Button";
import UserProfile from "@/components/UserProfile";

import girl from "@/assets/images/users/girl.jpg";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modal";
import { useLazyCreatePostQuery } from "@/services/PostAPI";
import { getUserInfo } from "@/utils/auth";

interface ICreatePostModalPropsType {
  isShow: boolean;
  onSuccess: () => void;
}

function CreatePostModal({ isShow, onSuccess }: ICreatePostModalPropsType) {
  const [createPost, { data, isSuccess }] = useLazyCreatePostQuery();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const handleSubmitPost = async (value: any) => {
    if (userInfo?.id) {
      try {
        await createPost({
          title: value?.postContent,
          user_id: userInfo?.id,
        }).then((res) => {
          if (res?.data?.status === 200) {
            onSuccess();
            dispatch(closeModal());
          }
        });
      } catch (error) {}
    } else {
      dispatch(closeModal());
    }
  };

  return (
    <Modal isShow={isShow} title="Tạo bài viết" isRounded>
      <UserProfile image={girl} userDisplayName="Lan Anh" isRounded />
      <Form layout="vertical" onFinish={handleSubmitPost}>
        <Form.Item
          name="postContent"
          rules={[
            {
              required: true,
              message: "Hãy chia sẻ suy nghĩ trước nhé bạn ơi",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Lan Anh ơi, bạn đang nghĩ gì vậy?"
            autoSize={false}
            style={{ resize: "none", minHeight: "90px", borderRadius: "8px" }}
          />
        </Form.Item>
        <Button
          btnType="secondary"
          isRounded
          isFullWidth
          mt12
          htmlType="submit"
        >
          Đăng
        </Button>
      </Form>
    </Modal>
  );
}

export default CreatePostModal;
