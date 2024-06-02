import { Col, Row } from "antd";
import { useSelector } from "react-redux";

import { ECartView } from "@/redux/slices/cart";

import CartNavLeft from "@/components/CartNavLeft";
import CartView from "@/components/CartView";
import OrderView from "@/components/OrderView";
import WishListView from "@/components/WishListView";

export default function CartPageLayout() {
  const view = useSelector((state: any) => state.cart.view);
  return (
    <Row>
      <Col xl={6}>
        <CartNavLeft />
      </Col>
      <Col xl={18}>
        {view === ECartView.cartview && <CartView />}
        {view === ECartView.wishlistview && <WishListView />}
        {view === ECartView.orderview && <OrderView />}
      </Col>
    </Row>
  );
}
