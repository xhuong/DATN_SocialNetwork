import { IAuthenticationPayload } from "@/services/AuthenticationAPI";
import dayjs from "dayjs";

export interface ILoginPayloadFE {
  username: string;
  password: string;
}

export interface IUserBE {
  id: number;
  name: string;
  address: string;
  image_profile: string;
}

export interface ICommentBE {
  id: number;
  parent_comment_id: number | null;
  content: string;
  created_at: string;
  user_id: number;
  post_id: number;
  user: IUserBE;
  replies?: ICommentBE[];
}

export interface ILikeBE {
  id: number;
  user_id: number;
  post_id: number;
  user: IUserBE;
}

export interface IPostBE {
  id: number;
  title: string;
  user_id: number;
  created_date: string;
  user: IUserBE;
  Comment: ICommentBE[] | [];
  Images: IImageBE[] | [];
  Like: ILikeBE[] | [];
  isLiked: boolean;
  feeling?: string;
  isSavedPost: boolean;
}

export interface IImageBE {
  id: number;
  image_url: string;
  post_id: number;
}

export interface IPostFE {
  id: number;
  user: {
    id: number;
    userDisplayName: string;
    imageProfile: string;
  };
  createdDate: string;
  title: string;
  // images: string[];
  images: IImageFE[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  comments: ICommentFE[] | [];
  isLiked: boolean;
  feeling?: string;
  isSavedPost: boolean;
}

export type ICommentFE = {
  id: number;
  parentCommentId: number | null;
  comment: string;
  createdDate: string;
  user: {
    userId: number;
    authorAvatar: string;
    userDisplayName: string;
  };
  postId: number;
  replies?: ICommentFE[];
};

// const mapCommentBEToCommentUI = (
//   comments: ICommentBE[],
//   parentId: number | null = null
// ): ICommentFE[] => {
//   const result: ICommentFE[] = [];
//   for (const comment of comments) {
//     if (comment.parent_comment_id === parentId) {
//       const replies = mapCommentBEToCommentUI(comments, comment.id);
//       const cmt: ICommentFE = {
//         id: comment.id,
//         parentCommentId: comment.parent_comment_id,
//         createdDate: comment.created_at,
//         postId: comment.post_id,
//         user: {
//           authorAvatar:
//             "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808…WEHSwQYnDY9PpI8w5IybNZX0zApvY4a3hq44Q&oe=66651388",
//           userDisplayName: comment.user.name,
//           userId: comment.user.id,
//         },
//         comment: comment.content,
//       };
//       if (replies.length) {
//         cmt.replies = replies;
//       }
//       result.push(cmt);
//     }
//   }
//   return result;
// };

const nestComments = (comments: ICommentBE[]) => {
  const commentMap: { [id: number]: ICommentBE } = {};
  comments.forEach((comment) => {
    commentMap[comment?.id] = {
      ...comment,
      replies: [],
    };
  });

  const rootComments: ICommentBE[] = [];

  comments.forEach((comment) => {
    if (comment.parent_comment_id !== null) {
      const parentComment = commentMap[comment.parent_comment_id];
      if (parentComment && parentComment.replies) {
        parentComment.replies.push(commentMap[comment.id]);
      }
    } else {
      rootComments.push(commentMap[comment.id]);
    }
  });

  function flattenReplies(comment: ICommentBE) {
    const flatReplies: ICommentBE[] = [];

    function addRepliesToFlatList(comment: ICommentBE) {
      comment?.replies &&
        comment.replies.forEach((reply) => {
          flatReplies.push(reply);
          addRepliesToFlatList(reply);
        });
    }
    addRepliesToFlatList(comment);
    comment.replies = flatReplies;
  }

  rootComments.forEach((comment: ICommentBE) => {
    flattenReplies(comment);
    if (comment?.replies && comment.replies.length === 0) {
      delete comment.replies;
    } else {
      comment?.replies &&
        comment.replies.forEach((reply) => delete reply.replies);
    }
  });

  return rootComments;
};

const mapCommentBEToCommentUI = (comments: ICommentBE[]) => {
  const commentsUI: ICommentFE[] = [];
  comments.map((comment) => {
    const cmt: ICommentFE = {
      id: comment.id,
      comment: comment.content,
      createdDate: comment.created_at,
      postId: comment.post_id,
      parentCommentId: comment.parent_comment_id,
      user: {
        authorAvatar: comment.user.image_profile,
        userDisplayName: comment.user.name,
        userId: comment.user.id,
      },
      replies: comment.replies ? mapCommentBEToCommentUI(comment.replies) : [],
    };
    commentsUI.push(cmt);
  });
  return commentsUI;
};

interface IImageFE {
  id: number;
  image_url: string;
  post_id: number;
}

const mapImageBEToImageFE = (images: IImageBE[]): IImageFE[] => {
  return images.map((image) => ({
    id: image.id,
    image_url: image.image_url,
    post_id: image.post_id,
  }));
};

export const mapPostListBEToPostListUI = (posts: IPostBE[]): IPostFE[] => {
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    feeling: post.feeling,
    user: {
      id: post.user.id,
      userDisplayName: post.user.name,
      imageProfile: post.user.image_profile,
    },
    // comments: mapCommentBEToCommentUI(post.Comment),
    comments: mapCommentBEToCommentUI(nestComments(post.Comment)),
    createdDate: post.created_date,
    images: mapImageBEToImageFE(post.Images),
    commentCount: post.Comment?.length,
    likeCount: post.Like?.length || 0,
    shareCount: 0,
    isLiked: post.isLiked,
    isSavedPost: post.isSavedPost,
  }));
};

export const calculateTime = (pastTime: Date) => {
  const partTime = dayjs(pastTime);
  return dayjs().diff(partTime, "hour");
};

export interface ILikeBE {
  id: number;
  user_id: number;
  post_id: number;
}

export const mapLoginPayloadFEToBE = (
  payload: ILoginPayloadFE
): IAuthenticationPayload => ({
  user_name: payload.username,
  password: payload.password,
});
