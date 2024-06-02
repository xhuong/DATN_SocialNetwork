import { useMemo } from "react";

import { Col, Row } from "antd";
import { MdPayment } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";

import Introduce from "@/components/Introduce";
import Container from "@/layouts/Container";

export default function IntroduceLayout() {
  const contents = useMemo(
    () => [
      {
        heading: "Quick View",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        icon: <FaTruckFast />,
      },
      {
        heading: "Secure payment",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        icon: <MdPayment />,
      },
      {
        heading: "Best quality",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        icon: <FaHandHoldingHeart />,
      },
      {
        heading: "Return cuarantee",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        icon: <IoBagHandleOutline />,
      },
    ],
    []
  );
  return (
    <div style={{ padding: "16px" }}>
      <Container>
        <Row justify="space-between" gutter={[24, 24]}>
          {contents.map((item) => (
            <Col xl={6} lg={8} md={8} sm={12} xs={24}>
              <Introduce
                heading={item.heading}
                desc={item.desc}
                icon={item.icon}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
