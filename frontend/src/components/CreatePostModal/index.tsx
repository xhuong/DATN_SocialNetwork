import { useState } from "react";
import { Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import UserProfile from "@/components/UserProfile";

import { useLazyCreatePostQuery } from "@/services/PostAPI";
import { useLazyUploadImagesQuery } from "@/services/UploadImageAPI";

import { getUserInfo } from "@/utils/auth";
import { closeModal } from "@/redux/slices/modal";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/utils/constant";

import girl from "@/assets/images/users/girl.jpg";

interface ICreatePostModalPropsType {
  isShow: boolean;
  onSuccess: () => void;
}

function CreatePostModal({ isShow, onSuccess }: ICreatePostModalPropsType) {
  const [createPost] = useLazyCreatePostQuery();
  const [uploadImage] = useLazyUploadImagesQuery();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files);
  };

  const handleUploadFile = async (post_id: number) => {
    const uploaded: any = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", selectedFiles[i]);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      try {
        const response: any = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            body: formData,
            method: "POST",
          }
        ).then((res) => res.json());

        const payload = {
          image_url: response.url,
          post_id: post_id,
        };
        await uploadImage([payload]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setUploadedFiles(uploaded);
  };

  const handleSubmitPost = async (value: any) => {
    if (userInfo?.id) {
      try {
        const postRes: any = await createPost({
          title: value?.postContent,
          user_id: userInfo?.id,
        });

        await handleUploadFile(postRes?.data?.result?.data?.id);

        onSuccess();
        dispatch(closeModal());
      } catch (error) {
        toast.error("Error when create your post!", {
          autoClose: 2000,
          theme: "light",
        });
        dispatch(closeModal());
      }
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
            placeholder={`${userInfo.name} ơi, bạn đang nghĩ gì vậy?`}
            autoSize={false}
            style={{ resize: "none", minHeight: "90px", borderRadius: "8px" }}
          />
        </Form.Item>
        <div className="uploadImage">
          <input type="file" multiple onChange={handleFileChange} />
          {uploadedFiles.map((file: any, index) => (
            <li key={index}>
              <img src={file.secure_url} alt={`file-${index}`} width="100" />
            </li>
          ))}
        </div>
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
