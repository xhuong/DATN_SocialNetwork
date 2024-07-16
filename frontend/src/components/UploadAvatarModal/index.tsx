import { Form, Modal } from "antd";
import Button from "../Button";
import { useEffect, useState } from "react";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/utils/constant";
import {
  useGetProfileInfoQuery,
  useUpdateAvatarMutation,
} from "@/services/UserAPI";
import { getUserInfo } from "@/utils/auth";

import styles from "./index.module.scss";
import { hideLoading, showLoading } from "@/redux/slices/loading";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function UploadAvatarModal({
  show,
  onSuccess,
  onCancel,
}: {
  show: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [previewImg, setPreviewImg] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const dispatch = useDispatch();

  const userInfo = getUserInfo();
  const { data, isFetching, isSuccess, refetch } = useGetProfileInfoQuery({
    userId: userInfo.id,
  });
  const [uploadImage] = useUpdateAvatarMutation();

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files) {
      let filePreview: string = "";
      Array.from(e.target.files).forEach((file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            filePreview = reader.result as string;
            if (filePreview.length) {
              setPreviewImg(filePreview);
            }
          }
        };
      });
    }
  };

  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const response: any = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          body: formData,
          method: "POST",
        }
      ).then((res) => res.json());
      await uploadImage({
        id: userInfo.id,
        updateAvatarDto: { image_profile: response.url },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onSubmit = async () => {
    if (userInfo?.id) {
      try {
        dispatch(showLoading());
        await handleUploadFile().then(() => onSuccess());
      } catch (error) {
        toast.error("Error change avatar!", {
          autoClose: 2000,
          theme: "light",
        });
      } finally {
        dispatch(hideLoading());
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile("");
    setPreviewImg("");
    onCancel();
  };

  useEffect(() => {
    if (data && isSuccess) {
      setPreviewImg(data.image_profile);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    show && refetch();
  }, [show]);

  return (
    <Modal
      open={show}
      footer={null}
      title="Update your avatar"
      destroyOnClose
      onCancel={handleCancel}
    >
      {previewImg && (
        <div className={styles.previewImage}>
          <img src={previewImg} alt="" />
        </div>
      )}
      <Form layout="vertical" onFinish={onSubmit}>
        <div className={styles.uploadImage}>
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
          disabled={!selectedFile}
        >
          Update avatar
        </Button>
      </Form>
    </Modal>
  );
}

export default UploadAvatarModal;
