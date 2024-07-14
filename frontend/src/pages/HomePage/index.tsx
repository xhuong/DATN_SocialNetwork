import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import PostList from "@/layouts/PostList";
import { getUserInfo } from "@/utils/auth";

const HomePage = () => {
  const userInfo = getUserInfo();
  return (
    <>
      <Header />
      <MainLayout children={<PostList userId={userInfo.id} isSelf />} />
    </>
  );
};

export default HomePage;
