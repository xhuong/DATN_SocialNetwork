import { Col, Form, Input, Radio, Row, Select, Slider } from "antd";
import ProductList from "@/layouts/ProductList";
import { useEffect, useState } from "react";
import { IBookType } from "@/components/Product";
import { useGetListAuthorsQuery } from "@/services/AuthorAPI";
import { useGetListPublishersQuery } from "@/services/PublisherAPI";
import Button from "@/components/Button";
import {
  IPayloadSearchBookDto,
  useGetListBooksQuery,
  useLazyGetListBooksQuery,
} from "@/services/BookAPI";
import { mapBackendDataToBookUI } from "@/utils/common";

function ShopLayout() {
  const [data, setData] = useState<IBookType[]>();

  const { data: books, isSuccess } = useGetListBooksQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    getListBooks,
    { data: booksLazy, isFetching, isSuccess: isSuccessLazyGetListBooks },
  ] = useLazyGetListBooksQuery({
    refetchOnFocus: true,
  });

  const { data: authors } = useGetListAuthorsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const { data: publishers } = useGetListPublishersQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      let { data } = books?.result;
      const dataConverted = mapBackendDataToBookUI(data);
      setData(dataConverted);
    }
  }, [isSuccess, books]);

  useEffect(() => {
    if (isSuccessLazyGetListBooks && booksLazy?.result?.data) {
      let { data } = booksLazy?.result;
      const dataConverted = mapBackendDataToBookUI(data);
      setData(dataConverted);
    }
  }, [isSuccessLazyGetListBooks, booksLazy]);

  const onFinish = (fieldValue: any) => {
    console.log("🚀 ~ onFinish ~ fieldValue:", fieldValue);
    let payload: IPayloadSearchBookDto = {};
    payload.name = fieldValue["book-name"];
    payload.min_price = fieldValue["price-range"][0] * 1000;
    payload.max_price = fieldValue["price-range"][1] * 1000;
    payload.author_id = fieldValue["author-id"];
    payload.publisher_id = fieldValue["publisher-id"];
    getListBooks(payload);
  };

  return (
    <div className="" style={{ marginBottom: "10px" }}>
      <Row>
        <Col xl={4} style={{ marginTop: "65px" }}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Filter by book name" name="book-name">
              <Input placeholder="Search by book name" />
            </Form.Item>

            {/* Author  */}
            <Form.Item label="Filter by author" name="author-id">
              <Select
                showSearch
                placeholder="Search by author"
                options={authors?.result.data.map((author) => ({
                  value: author.id,
                  label: author.name,
                }))}
              />
            </Form.Item>

            {/* Publisher  */}
            <Form.Item label="Filter by publisher" name="publisher-id">
              <Select
                showSearch
                placeholder="Search by publisher"
                options={publishers?.result.data.map((publisher) => ({
                  value: publisher.id,
                  label: publisher.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Filter by price range"
              name="price-range"
              initialValue={[30, 60]}
            >
              <Slider range disabled={false} />
            </Form.Item>
            <Form.Item>
              <Button
                btnType="secondary"
                isFullWidth
                htmlType="submit"
                isRounded
              >
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xl={20}>
          {data && data.length > 0 ? (
            <ProductList
              data={data}
              title="List products"
              subTitle="List products"
            />
          ) : (
            <p
              style={{
                backgroundColor: "rgb(245 197 0 / 81%)",
                color: "#ffffff",
                textAlign: "center",
                fontWeight: "300",
                padding: "8px 0",
                borderRadius: "4px",
              }}
            >
              List product is empty
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ShopLayout;
