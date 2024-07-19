import { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Form, Input, Modal, Row, Select } from "antd";

import { toast } from "react-toastify";

import Button from "@/components/Button";
import UserProfile from "@/components/UserProfile";

import { useLazyCreatePostQuery } from "@/services/PostAPI";
import { useLazyUploadImagesQuery } from "@/services/UploadImageAPI";

import { getUserInfo } from "@/utils/auth";
import { closeModal } from "@/redux/slices/modal";
import { hideLoading, showLoading } from "@/redux/slices/loading";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/utils/constant";

import styles from "./index.module.scss";
import { EMOTIONS } from "./constant";

interface ICreatePostModalPropsType {
  isShow: boolean;
  onSuccess: () => void;
  feeling?: string;
}

interface ICreatePostFormValue {
  postContent: string;
  emotion?: string;
}

function CreatePostModal({
  isShow,
  onSuccess,
  feeling,
}: ICreatePostModalPropsType) {
  const [createPost] = useLazyCreatePostQuery();
  const [uploadImage] = useLazyUploadImagesQuery();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  const handleFileChange = (e: any) => {
    setSelectedFiles(e.target.files);
    if (e.target.files) {
      const filePreviews: string[] = [];
      Array.from(e.target.files).forEach((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            filePreviews.push(reader.result as string);
            if (filePreviews.length === e.target.files.length) {
              setPreviewImgs(filePreviews);
            }
          }
        };
      });
    }
  };

  const handleUploadFile = async (post_id: number) => {
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
  };

  const handleSubmitPost = async (value: ICreatePostFormValue) => {
    if (userInfo?.id) {
      try {
        dispatch(showLoading());
        const postRes: any = await createPost({
          title: value.postContent,
          user_id: userInfo?.id,
          feeling: value.emotion,
        });

        await handleUploadFile(postRes?.data?.result?.data?.id).then(() =>
          onSuccess()
        );
      } catch (error) {
        toast.error("Error when create your post!", {
          autoClose: 2000,
          theme: "light",
        });
      } finally {
        dispatch(hideLoading());
        dispatch(closeModal());
      }
    } else {
      dispatch(closeModal());
    }
  };

  const onHideModal = () => {
    dispatch(closeModal());
    setPreviewImgs([]);
  };

  return (
    <Modal
      open={isShow}
      onCancel={onHideModal}
      destroyOnClose
      footer={null}
      className={styles.modal}
    >
      <UserProfile
        image={userInfo.image_profile}
        userDisplayName={userInfo.name}
        isRounded
        bgGray={false}
      />
      <Form layout="vertical" onFinish={handleSubmitPost}>
        <Form.Item name="emotion">
          <Select
            style={{ width: "50%" }}
            options={[...EMOTIONS]}
            placeholder="How do you feeling?"
          />
        </Form.Item>
        <Form.Item
          name="postContent"
          rules={[
            {
              required: true,
              message: "Please input your think first 😊",
            },
          ]}
        >
          <Input.TextArea
            placeholder={`Hey ${userInfo.name}!, What do you thinking?`}
            autoSize={false}
            style={{ resize: "none", minHeight: "90px", borderRadius: "8px" }}
          />
        </Form.Item>

        {previewImgs.length > 0 && (
          <Row gutter={[8, 8]} className={styles.previewImgs}>
            {previewImgs.map((img, index) => (
              <Col xs={8} key={index}>
                <div className={styles.previewImg}>
                  <img src={img} alt="" />
                </div>
              </Col>
            ))}
          </Row>
        )}

        <div className="uploadImage">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <Button
          btnType="secondary"
          isRounded
          isFullWidth
          mt12
          htmlType="submit"
        >
          Post
        </Button>
      </Form>
    </Modal>
  );
}

export default CreatePostModal;
