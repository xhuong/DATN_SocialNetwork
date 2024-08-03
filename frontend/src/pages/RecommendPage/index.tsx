import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import PostList2 from "@/layouts/PostList2";

import { getUserInfo } from "@/utils/auth";

const RecommendPage = () => {
  const userInfo = getUserInfo();
  return (
    <>
      <Header />
      <MainLayout
        children={<PostList2 idUser={userInfo.id} isGetRecommendPost={true} />}
      />
    </>
  );
};

export default RecommendPage;
