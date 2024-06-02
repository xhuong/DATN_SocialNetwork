import SimpleSlider from "@/components/Slider";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import IntroduceLayout from "@/layouts/IntroduceLayout";
import ProductList from "@/layouts/ProductList";
import ShopLayout from "@/layouts/ShopLayout";
import ViewAllCategory from "@/layouts/ViewAllCategory";

const ShopPage = () => {
  return (
    <>
      <Header />
      <SimpleSlider />
      <ShopLayout />
      <Footer />
    </>
  );
};

export default ShopPage;
