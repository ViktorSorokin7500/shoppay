import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import AddReview from "./AddReview";
import Table from "./Table";

export default function Reviews({ product }) {
  const { data: session } = useSession();
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h1>Customer Reviews ({product.reviews.length}) </h1>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Averge Rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-rating"
                defaultValue={product.rating}
                precision={1}
                readOnly
                style={{ color: "#FACF19" }}
              />
              {product.rating === 0
                ? "No reviews yet."
                : Math.round(product.rating)}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  style={{ color: "#FACF19" }}
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        {session ? (
          <AddReview product={product} />
        ) : (
          <button className={styles.login_btn} onClick={() => signIn()}>
            Login to add review
          </button>
        )}
        <Table
          reviews={product.reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>
  );
}

let ratings = ["5", "4", "3", "2", "1"];
