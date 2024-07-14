import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import PostList from "@/layouts/PostList";
import { getUserInfo } from "@/utils/auth";

const HomePage = () => {
  const userInfo = getUserInfo();
  return (
    <>
      <Header />
      <MainLayout
        children={
          <PostList
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

export default HomePage;
