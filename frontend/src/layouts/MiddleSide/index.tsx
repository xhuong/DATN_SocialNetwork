import { useEffect, useState, createContext } from "react";

import { IPostFE, mapPostListBEToPostListUI } from "@/utils/common";

import {
  useGetPostListByUserIdQuery,
  useLazyGetPostListByUserIdQuery,
} from "@/services/PostAPI";

import YourThink from "@/components/YourThink";
import Post from "@/components/Post";
import {
  useDislikeAPostMutation,
  useLazyLikeAPostQuery,
} from "@/services/LikeAPI";

import styles from "./index.module.scss";
import {
  IAddNewCommentDto,
  useLazyAddNewCommentQuery,
} from "@/services/CommentAPI";
import { getUserInfo } from "@/utils/auth";
import { IUserInfoBE } from "@/services/AuthenticationAPI";
import CreatePostModal from "@/components/CreatePostModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export interface IPostListProvider {
  handleLikeAPost: (userId: number, postId: number) => void;
  handleDislikeAPost: (userId: number, postId: number) => void;
  handleComment: (comment: IAddNewCommentDto) => void;
}

export const PostListContext = createContext<IPostListProvider>({
  handleLikeAPost: (userId: number, postId: number) => {},
  handleDislikeAPost: (userId: number, postId: number) => {},
  handleComment: (comment: IAddNewCommentDto) => {},
});

function MiddleSide() {
  const [postList, setPostList] = useState<IPostFE[]>([]);
  const isShowCreatePostModal = useSelector(
    (state: RootState) => state?.modal.isShow
  );

  const userInfo: IUserInfoBE | null = getUserInfo();

  const { data, isSuccess } = useGetPostListByUserIdQuery(
    { id_user: 2, id_user_viewing: userInfo?.id || 0 },
    { refetchOnMountOrArgChange: false }
  );

  const [getPostList] = useLazyGetPostListByUserIdQuery({
    refetchOnFocus: false,
  });

  const [likeAPost] = useLazyLikeAPostQuery({
    refetchOnFocus: false,
  });

  const [dislikeAPost] = useDislikeAPostMutation({});

  const [addNewComment] = useLazyAddNewCommentQuery({
    refetchOnFocus: false,
  });

  const handleLikeAPost = (userId: number, postId: number) => {
    if (userId && postId) {
      likeAPost({ post_id: postId, user_id: userId });
      getPostList({
        id_user: 2,
        id_user_viewing: userInfo?.id || 0,
      });
    }
  };

  const handleDislikeAPost = (userId: number, postId: number) => {
    if (userId && postId) {
      dislikeAPost({ post_id: postId, user_id: userId });
      getPostList({
        id_user: 2,
        id_user_viewing: userInfo?.id || 0,
      });
    }
  };

  const handleComment = (comment: IAddNewCommentDto) => {
    addNewComment(comment);
    getPostList({ id_user: 2, id_user_viewing: userInfo?.id || 0 });
  };
  const onCreatePostSuccess = () => {
    console.log("success");
    getPostList({ id_user: 2, id_user_viewing: userInfo?.id || 0 });
  };

  useEffect(() => {
    if (isSuccess) {
      const { data: res } = data?.result;
      const convertedData = mapPostListBEToPostListUI(res);
      setPostList(convertedData);
    }
  }, [data, isSuccess]);

  const defaultValue = {
    handleLikeAPost,
    handleDislikeAPost,
    handleComment,
  };

  return (
    <PostListContext.Provider value={{ ...defaultValue }}>
      <div className={styles.middleSide}>
        <YourThink />
        {postList?.map((post) => (
          <Post post={post} key={post?.id} />
        ))}
      </div>
      <CreatePostModal
        isShow={isShowCreatePostModal}
        onSuccess={onCreatePostSuccess}
      />
    </PostListContext.Provider>
  );
}

export default MiddleSide;
