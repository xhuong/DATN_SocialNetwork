import { useNavigate } from "react-router-dom";
import { Rate } from "antd";

import { CiHeart } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { addBookToCart, addBookToWishList } from "@/redux/slices/cart";
import { Bounce, toast } from "react-toastify";

import styles from "./index.module.scss";

export type IBookType = {
  id: number;
  name: string;
  price: number;
  author: string;
  imgSrc: string;
};

export default function Product({ book }: { book: IBookType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastNotify = (isWishList = false) =>
    toast.success(
      `Add book to ${isWishList ? "wishList" : "cart"} successfully`,
      {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );

  const { id, author, imgSrc, name, price } = book;

  return (
    <div className={styles.product} onClick={() => navigate(`/product/${id}`)}>
      <span className={styles.newLabel}>New</span>
      <div className={styles.productImg}>
        <img src={require(`@/assets/images/products/book/${imgSrc}`)} alt="" />
      </div>
      <div className={styles.productContent}>
        <h3 className={styles.productAuthor}>{author}</h3>
        <p className={styles.productName}>{name}</p>
        <div className={styles.productPriceWrapper}>
          <span className={styles.productPrice}>${price}</span>
          <Rate value={4.5} />
        </div>
      </div>
      <ul className={styles.productActions}>
        <li className={styles.productActionItem}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addBookToWishList({ ...book, count: 1 }));
              toastNotify(true);
            }}
          >
            <CiHeart />
          </span>
        </li>
        <li className={styles.productActionItem}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addBookToCart({ ...book, count: 1 }));
              toastNotify();
            }}
          >
            <BsCartPlus />
          </span>
        </li>
      </ul>
    </div>
  );
}
