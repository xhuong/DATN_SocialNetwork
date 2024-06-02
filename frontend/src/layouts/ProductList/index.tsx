import { Col, Row } from "antd";

import Section from "@/components/Section";
import Product, { IBookType } from "@/components/Product";

export type IProductList = {
  title: string;
  subTitle: string;
  data: IBookType[];
};

export default function ProductList({ title, subTitle, data }: IProductList) {
  return (
    <Section title={title} subTitle={subTitle}>
      <Row
        justify={{
          ["xs"]: "start",
          ["xl"]: "start",
          ["md"]: "start",
        }}
        gutter={[12, 12]}
      >
        {data.map((book: IBookType) => (
          <Col xl={4} lg={4} md={6} sm={12} xs={8} key={book.id}>
            <Product book={book} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}
