import { useNavigate } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Container from "@/layouts/Container";

import styles from "./index.module.scss";

const SimpleSlider = () => {
  const navigate = useNavigate();

  const settings = {
    useTransform: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.slider}>
      <Slider {...settings}>
        <div className={styles.sliderItem} onClick={() => navigate("/shop")}>
          {/* <Container>
            <div className={styles.sliderContent}>
              <p className={styles.sliderNameCollection}>Winter Collection</p>
              <h2 className={styles.sliderHeading}>
                New Winter <br /> Collections 2022
              </h2>
              <p className={styles.sliderSubheading}>
                There's nothing like trend
              </p>
              <Button
                type="primary"
                btnSize="md-btn"
                onClick={() => navigate("/shop")}
              >
                Shop Now <BsArrowRight />
              </Button>
            </div>
          </Container> */}
        </div>

        <div className={styles.sliderItem} onClick={() => navigate("/shop")}>
          {/* <div className={styles.sliderContent}>
            <p className={styles.sliderNameCollection}>Winter Collection</p>
            <h2 className={styles.sliderHeading}>
              New Winter <br /> Collections 2022
            </h2>
            <p className={styles.sliderSubheading}>
              There's nothing like trend
            </p>
            <Button
              type="primary"
              btnSize="md-btn"
              onClick={() => navigate("/shop")}
            >
              Shop Now <BsArrowRight />
            </Button>
          </div> */}
        </div>

        <div className={styles.sliderItem} onClick={() => navigate("/shop")}>
          {/* <div className={styles.sliderContent}>
            <p className={styles.sliderNameCollection}>Winter Collection</p>
            <h2 className={styles.sliderHeading}>
              New Winter <br /> Collections 2022
            </h2>
            <p className={styles.sliderSubheading}>
              There's nothing like trend
            </p>
            <Button
              type="primary"
              btnSize="md-btn"
              onClick={() => navigate("/shop")}
            >
              Shop Now <BsArrowRight />
            </Button>
          </div> */}
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
