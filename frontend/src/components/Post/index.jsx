import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";

function Post() {
  return (
    <div className="post">
      <div className="postHeader">
        <div className="postAuthor"></div>
        <div className="postHeaderAction"></div>
      </div>
      <div className="postBody">
        <p className="postTitle">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint,
          doloremque.
        </p>
        <ul className="postImages">
          <li className="postImageItem">
            <img src={require("../../assets/images/users/girl.jpg")} alt="" />
          </li>
        </ul>
      </div>
      <div className="postFooter">
        <div className="postFooterInfo">
          <div className="postLike">
            <span className="postLikeIcon">
              <BiLike />
            </span>
            <span className="postLikeCount">789</span>
          </div>
          <div className="postCommentShare">
            <span className="postCommentShareCount">35</span>
            <span className="postCommentShareText">bình luận</span>
          </div>
          <div className="postCommentShare">
            <span className="postCommentShareCount">1</span>
            <span className="postCommentShareText">lượt chia sẻ</span>
          </div>
        </div>
        <ul className="postFooterAction">
          <li className="postFooterActionItem">
            <span className="postFooterActionItemIcon">
              <BiLike />
            </span>
            <span className="postFooterActionItemText">Thích</span>
          </li>
          <li className="postFooterActionItem">
            <span className="postFooterActionItemIcon">
              <FaRegComment />
            </span>
            <span className="postFooterActionItemText">Bình luận</span>
          </li>
          <li className="postFooterActionItem">
            <span className="postFooterActionItemIcon">
              <RiShareForwardLine />
            </span>
            <span className="postFooterActionItemText">Chia sẻ</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Post;
