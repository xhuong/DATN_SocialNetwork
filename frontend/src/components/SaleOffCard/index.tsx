import styles from "./index.module.scss";

export default function SaleOffCard() {
  return (
    <div className={styles.saleOff}>
      <div className={styles.saleOffImg}>
        <img src={require("@/assets/images/products/book/4.png")} alt="" />
      </div>
      <div className={styles.saleOffTop}>
        <span>Buy now</span>
        <span>25% Off</span>
      </div>
      <div className={styles.saleOffBot}>
        <span>Reading book</span>
        <span>Reading book</span>
      </div>
    </div>
  );
}
