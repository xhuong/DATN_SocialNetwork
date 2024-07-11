import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import RecommendLayout from "@/layouts/RecommendLayout";

const RecommendPage = () => {
  return (
    <>
      <Header />
      <MainLayout children={<RecommendLayout />} />
    </>
  );
};

export default RecommendPage;
