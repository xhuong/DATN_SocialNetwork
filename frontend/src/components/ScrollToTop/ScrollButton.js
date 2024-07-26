import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "./Styles";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      return window.removeEventListener("scroll", toggleVisible);
    };
  });

  return (
    <Button
      style={{ display: visible ? "block" : "none" }}
      onClick={scrollToTop}
    >
      <FaArrowCircleUp />
    </Button>
  );
};

export default ScrollButton;
