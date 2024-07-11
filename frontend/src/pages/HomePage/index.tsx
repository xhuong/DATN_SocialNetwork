import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import PostList from "@/layouts/PostList";

const HomePage = () => {
  return (
    <>
      <Header />
      <MainLayout children={<PostList />} />
    </>
  );
};

export default HomePage;
