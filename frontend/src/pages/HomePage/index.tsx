import ChatWindow from "@/components/Chat";
import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";
import MiddleSide from "@/layouts/MiddleSide";

const HomePage = () => {
  return (
    <>
      <Header />
      <MainLayout children={<MiddleSide />} />
      <ChatWindow />
    </>
  );
};

export default HomePage;
