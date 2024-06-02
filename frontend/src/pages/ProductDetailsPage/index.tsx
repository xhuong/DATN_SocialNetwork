import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetBookByIdQuery } from "@/services/BookAPI";
import { mapBackendDataToBookUI } from "@/utils/common";

import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import ProductDetailsLayout from "@/layouts/ProductDetailsLayout";

import { IBookType } from "@/components/Product";
import { useDispatch } from "react-redux";
import { activeLoading, deactiveLoading } from "@/redux/slices/loading";
import Container from "@/layouts/Container";
import BreadCrumb from "@/components/BreadCrumb";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispath = useDispatch();

  const [bookDetail, setBookDetail] = useState<IBookType>();

  const { data, isLoading, isSuccess } = useGetBookByIdQuery(
    { id: Number(id) },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    dispath(activeLoading());
    if (isSuccess) {
      const { data: response } = data?.result;
      const dataConverted = mapBackendDataToBookUI(response)[0];
      setBookDetail(dataConverted);
      dispath(deactiveLoading());
    }
  }, [data, isSuccess]);

  return (
    <>
      <Header />
      <Container isMarginTopEqualHeaderHeight>
        <BreadCrumb />
      </Container>
      {bookDetail && <ProductDetailsLayout book={bookDetail} />}
      <Footer />
    </>
  );
}
