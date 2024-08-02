import { useEffect, useState } from "react";
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
import { EMOTIONS } from "./constant";

import styles from "./index.module.scss";

interface ICreatePostModalPropsType {
  isShow: boolean;
  onSuccess: () => void;
}

interface ICreatePostFormValue {
  postContent: string;
  emotion?: string;
}

function CreatePostModal({ isShow, onSuccess }: ICreatePostModalPropsType) {
  const [disableBtns, setDisabledBtns] = useState({
    disabledChooseImageBtn: false,
    disabledChooseVideoBtn: false,
  });

  const [createPost] = useLazyCreatePostQuery();
  const [uploadImage] = useLazyUploadImagesQuery();
  const userInfo = getUserInfo();
  const dispatch = useDispatch();

  const [selectedImageFiles, setSelectedImageFiles] = useState([]); // image files
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  const [selectedVideoFile, setSelectedVideoFile] = useState([]); // videos files
  const [previewVideo, setPreviewVideo] = useState<string[]>([]);

  const handleImageFileChange = (e: any) => {
    setSelectedImageFiles(e.target.files);
    setDisabledBtns((prev) => ({
      ...prev,
      disabledChooseVideoBtn: e.target?.files?.length,
    }));
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

  const handleVideoFileChange = (e: any) => {
    setSelectedVideoFile(e.target.files);
    setDisabledBtns((prev) => ({
      ...prev,
      disabledChooseImageBtn: e.target?.files?.length,
    }));
    if (e.target.files) {
      const filePreviews: string[] = [];
      Array.from(e.target.files).forEach((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            filePreviews.push(reader.result as string);
            if (filePreviews.length === e.target.files.length) {
              setPreviewVideo(filePreviews);
            }
          }
        };
      });
    }
  };

  const handleUploadImageFiles = async (post_id: number) => {
    for (let i = 0; i < selectedImageFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", selectedImageFiles[i]);
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

  const handleUploadVideoFile = async (post_id: number) => {
    for (let i = 0; i < selectedVideoFile.length; i++) {
      const formData = new FormData();
      formData.append("file", selectedVideoFile[i]);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      try {
        const response: any = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
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

        if (selectedVideoFile?.length > 0) {
          await handleUploadVideoFile(postRes?.data?.result?.data?.id).then(
            () => {
              onSuccess();
            }
          );
        } else if (selectedImageFiles?.length > 0) {
          await handleUploadImageFiles(postRes?.data?.result?.data?.id).then(
            () => onSuccess()
          );
        }
      } catch (error) {
        toast.error("Error when create your post!", {
          autoClose: 2000,
          theme: "light",
        });
      } finally {
        dispatch(hideLoading());
        onHideModal();
      }
    } else {
      onHideModal();
    }
  };

  const onHideModal = () => {
    dispatch(closeModal());
    setPreviewImgs([]);
    setDisabledBtns({
      disabledChooseImageBtn: false,
      disabledChooseVideoBtn: false,
    });
    setPreviewVideo([]);
    setSelectedImageFiles([]);
    setSelectedVideoFile([]);
  };

  useEffect(() => {
    !!!selectedImageFiles?.length && setPreviewImgs([]);
    !!!selectedVideoFile?.length && setPreviewVideo([]);
  }, [selectedImageFiles, selectedVideoFile]);

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
            style={{ width: "100%" }}
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

        {previewVideo.length > 0 && (
          <div
            style={{
              height: "200px",
              marginBottom: "4px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <video
              width={"100%"}
              height={"100%"}
              controls
              style={{ objectFit: "cover", objectPosition: "center" }}
            >
              <source src={previewVideo[0]} />
            </video>
          </div>
        )}

        <div className="uploadImage">
          <label
            htmlFor="input-imgs"
            style={{
              fontSize: "1.6rem",
              width: "100%",
              borderRadius: "4px",
              display: "inline-block",
              textAlign: "center",
              color: "#ffffff",
              padding: "6px 0",
              backgroundColor: `${
                disableBtns.disabledChooseImageBtn
                  ? "#d3d3d3"
                  : "var(--purple-color)"
              }`,
              cursor: `${
                disableBtns.disabledChooseImageBtn ? "not-allowed" : "pointer"
              }`,
            }}
          >
            Select images
          </label>
          <input
            style={{ visibility: "hidden", height: "4px" }}
            id="input-imgs"
            disabled={disableBtns.disabledChooseImageBtn}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageFileChange}
          />
        </div>
        <div className="uploadVideo">
          <label
            htmlFor="input-video"
            style={{
              fontSize: "1.6rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #000",
              display: "inline-block",
              textAlign: "center",
              color: "#000000",
              padding: "6px 0",
              backgroundColor: `${
                disableBtns.disabledChooseVideoBtn ? "#d3d3d3" : "#ffffff"
              }`,
              cursor: `${
                disableBtns.disabledChooseVideoBtn ? "not-allowed" : "pointer"
              }`,
            }}
          >
            Select video
          </label>
          <input
            style={{ visibility: "hidden", height: "4px" }}
            id="input-video"
            disabled={disableBtns.disabledChooseVideoBtn}
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoFileChange}
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
