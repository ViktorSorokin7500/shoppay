import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Empty() {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="empty" />
      <h1>Cart is empty</h1>
      {!session && (
        <button className={styles.empty__btn} onClick={() => signIn()}>
          SIGN IN / REGISTER
        </button>
      )}
      <Link href="/browse">
        <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>
          SHOP NOW
        </button>
      </Link>
    </div>
  );
}
