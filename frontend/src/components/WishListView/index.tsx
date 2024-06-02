import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "antd";

import {
  addBookToCart,
  addBookToWishListWithReplaceCount,
  removeAllBooksFromWishList,
} from "@/redux/slices/cart";
import { MdRemoveShoppingCart } from "react-icons/md";

import Button from "@/components/Button";
import InputNumber from "@/components/InputNumber";

import { formatPrice } from "@/utils/common";

import { IBookCartType } from "@/components/CartView";

import styles from "./index.module.scss";

export default function WishListView() {
  const dispatch = useDispatch();
  const listBooksInWishList = useSelector((state: any) => state.cart.wishlist);

  const getTotalPrice = useCallback((books: IBookCartType[]) => {
    let price = 0;
    books.forEach((book: IBookCartType) => {
      price += book.price * book.count;
    });
    return price;
  }, []);

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <span>My Wish List</span>
        <Button
          btnType="secondary"
          isRounded
          btnSize="m"
          onClick={() => {
            listBooksInWishList.map((book: any) => {
              dispatch(addBookToCart(book));
            });
            dispatch(removeAllBooksFromWishList());
          }}
        >
          Move all to cart
        </Button>
      </div>
      <div className={styles.cartTable}>
        <Row gutter={[12, 12]}>
          {listBooksInWishList?.length > 0 ? (
            listBooksInWishList.map((book: any) => (
              <>
                <Col xl={10}>
                  <div className={styles.bookInfo}>
                    <div className={styles.bookInfoImg}>
                      <img
                        src={require(`@/assets/images/products/book/${book.imgSrc}`)}
                        alt=""
                      />
                    </div>
                    <div className={styles.bookInfoContent}>
                      <h5 className={styles.bookName}>{book.name}</h5>
                      <p className={styles.bookUnitPrice}>
                        Unit price: <span>{formatPrice(book.price)}</span>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className={styles.subTotal}>
                    <p>Subtotal:</p>
                    <span>{formatPrice(book.price * book.count)}</span>
                  </div>
                </Col>
                <Col xl={4}>
                  <div className={styles.expectedDate}>
                    <p>Expected date by:</p>
                    <span>22 November 2022</span>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className={styles.bookCount}>
                    <InputNumber
                      defaultValue={book.count}
                      onChange={(value) => {
                        dispatch(
                          addBookToWishListWithReplaceCount({
                            ...book,
                            count: value,
                          })
                        );
                      }}
                    />
                  </div>
                </Col>
              </>
            ))
          ) : (
            <p style={{ margin: "0 auto" }}>Your wish list is empty.</p>
          )}
        </Row>
      </div>
      <div className={styles.cartFooter}>
        {listBooksInWishList?.length > 0 && (
          <>
            <Button
              btnType="primary"
              btnSize="m"
              isRounded
              onClick={() => {
                dispatch(removeAllBooksFromWishList());
              }}
            >
              Clear wish list <MdRemoveShoppingCart />
            </Button>
            <p className={styles.totalPrice}>
              Total:{" "}
              <span>{formatPrice(getTotalPrice(listBooksInWishList))}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
