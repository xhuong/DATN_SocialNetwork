import ChatWindow from "@/components/Chat";
import Header from "@/layouts/Header";
import MainLayout from "@/layouts/MainLayout";

const HomePage = () => {
  return (
    <>
      <Header />
      <MainLayout />
      <ChatWindow />
    </>
  );
};

export default HomePage;
