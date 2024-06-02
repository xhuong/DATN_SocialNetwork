import { Col, Rate, Row } from "antd";

import { BsCart } from "react-icons/bs";
import { formatPrice } from "@/utils/common";

import Container from "@/layouts/Container";

import Button from "@/components/Button";
import InputNumber from "@/components/InputNumber";
import Product, { IBookType } from "@/components/Product";

import styles from "./index.module.scss";

export default function ProductDetailsLayout({ book }: { book: IBookType }) {
  const { id, author, imgSrc, name, price } = book;
  return (
    <div className={styles.proDetail} style={{ marginTop: "20px" }}>
      <Container>
        <Row gutter={[24, 24]}>
          <Col xl={12} md={12}>
            <div className={styles.proDetailImg}>
              <div className={styles.proDetailImgWrapper}>
                <img
                  src={require(`@/assets/images/products/book/${imgSrc}`)}
                  alt=""
                />
              </div>
              <ul className={styles.proDetailImgList}>
                <li className={`${styles.proDetailImgItem} ${styles.active}`}>
                  <img
                    src={require(`@/assets/images/products/book/${imgSrc}`)}
                    alt=""
                  />
                </li>
                <li className={styles.proDetailImgItem}>
                  <img
                    src={require(`@/assets/images/products/book/${imgSrc}`)}
                    alt=""
                  />
                </li>
                <li className={styles.proDetailImgItem}>
                  <img
                    src={require(`@/assets/images/products/book/${imgSrc}`)}
                    alt=""
                  />
                </li>
                <li className={styles.proDetailImgItem}>
                  <img
                    src={require(`@/assets/images/products/book/${imgSrc}`)}
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </Col>
          <Col xl={12} md={12}>
            <div className={styles.proDetailDesc}>
              <span className={styles.cateHeading}>Category name</span>
              <span className={styles.productStatus}>In stock </span>
              <h2 className={styles.bookName}>{name}</h2>

              <p className={styles.bookDesc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                placeat sint ipsa minus alias voluptatem rem quaerat fugiat,
                maiores nostrum expedita mollitia repudiandae qui eius in quae
                esse pariatur nobis delectus dicta corporis vitae
                necessitatibus? Reiciendis nesciunt consequuntur excepturi odit
                autem suscipit voluptas iste consectetur dolores vero
                accusantium esse quis eveniet, non a veniam laboriosam porro
                delectus numquam? Atque, quae.
              </p>

              <div className={styles.review}>
                <Rate value={4} />
                <p className={styles.writeReview} onClick={() => {}}>
                  Write a review
                </p>
              </div>
              <span className={styles.price}>{formatPrice(price)}</span>
              <div className={styles.actions}>
                <Button btnType="secondary" isRounded>
                  Add to cart <BsCart />
                </Button>
                <InputNumber defaultValue={1} />
                <Button btnType="secondary" isRounded>
                  Go to cart page
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Comment  */}
        <Row gutter={[24, 24]}>
          <Col xl={12}></Col>
        </Row>

        {/* Book recommendations  */}
        {/* <Row>
          <Col xl={24}>
            <Row>
              <Col xl={4}>
                <Product book={} />
              </Col>
            </Row>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
}
