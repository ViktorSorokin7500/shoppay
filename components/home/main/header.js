import styles from "./styles.module.scss";

import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Store</Link>
        </li>
        <li>
          <Link href="">Electronic</Link>
        </li>
        <li>
          <Link href="">Watches</Link>
        </li>
      </ul>
    </div>
  );
}
