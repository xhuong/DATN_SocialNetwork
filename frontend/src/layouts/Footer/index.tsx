import { Link } from "react-router-dom";

import { Col, Row } from "antd";
import { FaFacebookF } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
import { FiYoutube } from "react-icons/fi";
import { IoLogoTwitter } from "react-icons/io";

import Container from "@/layouts/Container";

import styles from "./index.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <Row gutter={[24, 24]}>
          <Col md={16} xl={16} className={styles.footerWrapper}>
            <Row justify="space-between" gutter={[24, 24]}>
              <Col xl={6} md={3}>
                <ul className={styles.footerList}>
                  <li className={styles.footerItem}>
                    <span>XH BookStore</span>
                  </li>
                  <li className={styles.footerItem}>
                    <ul className={styles.footerSocials}>
                      <li className={styles.footerSocial}>
                        <span>
                          <FaFacebookF />
                        </span>
                      </li>
                      <li className={styles.footerSocial}>
                        <span>
                          <SlSocialInstagram />
                        </span>
                      </li>
                      <li className={styles.footerSocial}>
                        <span>
                          <FiYoutube />
                        </span>
                      </li>
                      <li className={styles.footerSocial}>
                        <span>
                          <IoLogoTwitter />
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Col>
              <Col xl={6} md={3}>
                <ul className={styles.footerList}>
                  <li className={styles.footerItem}>
                    <span>About us</span>
                  </li>
                  <li className={styles.footerItem}>
                    <Link to="/">About us</Link>
                  </li>
                  <li className={styles.footerItem}>
                    <Link to="/">About us</Link>
                  </li>
                </ul>
              </Col>
              <Col xl={6} md={3}>
                <ul className={styles.footerList}>
                  <li className={styles.footerItem}>
                    <span>Categories</span>
                  </li>
                  <li className={styles.footerItem}>
                    <span>Categories</span>
                  </li>
                  <li className={styles.footerItem}>
                    <span>Categories</span>
                  </li>
                  <li className={styles.footerItem}>
                    <span>Categories</span>
                  </li>
                </ul>
              </Col>
              <Col xl={6} md={3}>
                <ul className={styles.footerList}>
                  <li className={styles.footerItem}>
                    <span>Quick help</span>
                  </li>
                  <li className={styles.footerItem}>
                    <span>Quick help</span>
                  </li>
                  <li className={styles.footerItem}>
                    <span>Quick help</span>
                  </li>
                  <li className={styles.footerItem}>
                    <span>Quick help</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={8} xl={8}>
            <div className={`${styles.footerPayment} ${styles.footerWrapper}`}>
              <img src={require("@/assets/images/payments/card.png")} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
