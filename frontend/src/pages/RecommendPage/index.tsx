import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import RecommendLayout from "@/layouts/RecommendLayout";
import { getUserInfo } from "@/utils/auth";

const RecommendPage = () => {
  const userInfo = getUserInfo();
  return (
    <>
      <Header />
      <MainLayout
        children={
          <RecommendLayout
            userId={userInfo.id}
            is_includes_posts_of_following_users={true}
            id_user_viewing={userInfo.id}
            isSelf
          />
        }
      />
    </>
  );
};

export default RecommendPage;
