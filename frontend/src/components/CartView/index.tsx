import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from "antd";

import {
  addBookToCartWithReplaceCount,
  removeAllBooksFromCart,
} from "@/redux/slices/cart";
import { MdRemoveShoppingCart } from "react-icons/md";

import Button from "@/components/Button";
import InputNumber from "@/components/InputNumber";
import { IBookType } from "@/components/Product";

import { formatPrice } from "@/utils/common";

import styles from "./index.module.scss";

export interface IBookCartType extends IBookType {
  count: number;
}

export default function CartView() {
  const dispatch = useDispatch();
  const listBooksInCart = useSelector((state: any) => state.cart.cart);

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
        <span>My Cart</span>
        <Button btnType="secondary" isRounded btnSize="m" onClick={() => {}}>
          Check out
        </Button>
      </div>
      <div className={styles.cartTable}>
        <Row gutter={[12, 12]}>
          {listBooksInCart?.length > 0 ? (
            listBooksInCart.map((book: any) => (
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
                          addBookToCartWithReplaceCount({
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
            <p style={{ margin: "0 auto" }}>Your cart is empty.</p>
          )}
        </Row>
      </div>
      <div className={styles.cartFooter}>
        {listBooksInCart?.length > 0 && (
          <>
            <Button
              btnType="primary"
              btnSize="m"
              isRounded
              onClick={() => {
                dispatch(removeAllBooksFromCart());
              }}
            >
              Clear cart <MdRemoveShoppingCart />
            </Button>
            <p className={styles.totalPrice}>
              Total: <span>{formatPrice(getTotalPrice(listBooksInCart))}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
