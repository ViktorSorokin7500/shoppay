import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Main() {
  const { cart } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <div className={styles.logo}>
            <img src="../../../logo.png" alt="" />
          </div>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search_icon}>
            <RiSearch2Line />
          </div>
        </div>

        <Link href="/cart">
          <div className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
