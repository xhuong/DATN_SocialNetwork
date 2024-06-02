import React, { useCallback, useEffect, useState } from "react";

import { Col, Row } from "antd";

import {
  IOrder,
  IOrderDetail,
  useGetAllOrderByUserIdQuery,
} from "@/services/OrderAPI";

import styles from "./index.module.scss";
import { formatPrice } from "@/utils/common";

export default function OrderView() {
  // for example: id_user = 1
  const { data, isSuccess, isLoading, isFetching } =
    useGetAllOrderByUserIdQuery({ id: 1 }, { refetchOnMountOrArgChange: true });
  const [orderData, setOrderData] = useState<IOrder[]>([]);

  useEffect(() => {
    if (data && isSuccess) {
      const { data: orderData } = data?.result;
      setOrderData(orderData?.length > 0 ? orderData : []);
    }
  }, [data]);

  const getTotalPrice = useCallback(
    (orderData: IOrder[]) => {
      if (orderData && orderData.length > 0) {
        let totalPrice = 0;
        orderData.map((orderDataItem: IOrder) => {
          let { Order_detail: order_details } = orderDataItem;
          order_details.map((orderDetailItem: IOrderDetail) => {
            let { book, amount } = orderDetailItem;
            let { price } = book;
            totalPrice += amount * price;
          });
        });
        return totalPrice;
      }
      return 0;
    },
    [orderData]
  );

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <span>My order</span>
      </div>
      {isFetching && (
        <p
          style={{
            width: "100%",
            backgroundColor: "#a487db",
            textAlign: "center",
            paddingTop: "4px",
            paddingBottom: "4px",
            borderRadius: "4px",
            color: "white",
          }}
        >
          Loading order data...
        </p>
      )}
      {!isFetching && (
        <>
          <div className={styles.cartTable}>
            <Row gutter={[12, 12]}>
              {orderData.map((orderItem) => {
                let {
                  id,
                  status,
                  Order_detail: order_details,
                  order_date,
                } = orderItem;
                return (
                  <>
                    <Col xl={24}>
                      <p>
                        Order id: <strong>#{id}</strong>
                      </p>
                    </Col>
                    {order_details.map((orderDetailItem: IOrderDetail) => {
                      let { book_id, amount, book } = orderDetailItem;
                      let { id, name, price, image_url } = book;
                      return (
                        <React.Fragment>
                          <Col xl={10}>
                            <div className={styles.bookInfo}>
                              <div className={styles.bookInfoImg}>
                                <img
                                  src={require(`@/assets/images/products/book/${image_url}`)}
                                  alt=""
                                />
                              </div>
                              <div className={styles.bookInfoContent}>
                                <h5 className={styles.bookName}>{name}</h5>
                                <p className={styles.bookUnitPrice}>
                                  Unit price: <span>{formatPrice(price)}</span>
                                </p>
                                <p className={styles.bookUnitPrice}>
                                  Amount: x<strong>{amount}</strong>
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col xl={4}>
                            <div className={styles.subTotal}>
                              <p>Subtotal:</p>
                              <span>{formatPrice(price * amount)}</span>
                            </div>
                          </Col>
                          <Col xl={4}>
                            <div className={styles.expectedDate}>
                              <p>Expected date by:</p>
                              <span>{order_date.toString()}</span>
                            </div>
                          </Col>
                          <Col xl={6}>
                            <div className={styles.orderStatus}>
                              <p>Order status: </p>
                              <span>{status}</span>
                            </div>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  </>
                );
              })}
            </Row>
          </div>
          <div className={styles.cartFooter}>
            <span>You can paid using COD or bank transfer method</span>
            <p className={styles.totalPrice}>
              Total: <span>{formatPrice(getTotalPrice(orderData))}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
