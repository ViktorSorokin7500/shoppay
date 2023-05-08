import Header from "./header";
import Menu from "./menu";
import MainSwiper from "./swiper";
import Offers from "./offers";
import User from "./user";

import styles from "./styles.module.scss";

export default function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
}
