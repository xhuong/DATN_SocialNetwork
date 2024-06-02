import { useEffect, useState } from "react";

import { mapBackendDataToBookUI } from "@/utils/common";

import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import ProductList from "@/layouts/ProductList";
import ViewAllCategory from "@/layouts/ViewAllCategory";
import IntroduceLayout from "@/layouts/IntroduceLayout";

import { IBookType } from "@/components/Product";
import SimpleSlider from "@/components/Slider";

import { useGetNewestBooksQuery } from "@/services/BookAPI";
import { useDispatch } from "react-redux";
import { activeLoading, deactiveLoading } from "@/redux/slices/loading";
import MainLayout from "@/layouts/MainLayout";

const HomePage = () => {
  // const dispatch = useDispatch();

  // const [newestBooks, setNewestBook] = useState<IBookType[]>([]);

  // const { data, isSuccess } = useGetNewestBooksQuery(null, {
  //   refetchOnMountOrArgChange: true,
  // });

  // useEffect(() => {
  //   dispatch(activeLoading());
  //   if (isSuccess) {
  //     const { data: response } = data?.result;
  //     const dataConverted = mapBackendDataToBookUI(response);
  //     setNewestBook(dataConverted);
  //     dispatch(deactiveLoading());
  //   }
  // }, [data, isSuccess]);

  return (
    <>
      <Header />
      <MainLayout />
    </>
  );
};

export default HomePage;
