import styles from "./index.module.scss";

export type ICommentType = {
  userImg: string;
  author: string;
  date: Date;
  content: string;
};

export default function Comment({
  userImg,
  author,
  date,
  content,
}: ICommentType) {
  return (
    <div className="comment">
      <div className="commentUserImg">
        <img src={require("@/assets/images/users/user.jpg")} alt="" />
      </div>
      <div className="comment">
        <span className="commentAuthor">John</span>
        <span className="commentDate">2024-03-04 11:10:15 AM</span>
        <p className="commentContent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fugit
          voluptatibus quae. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aliquid maxime consectetur iure.
        </p>
      </div>
    </div>
  );
}
