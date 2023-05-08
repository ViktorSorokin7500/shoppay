import Header from "../components/header";
import Footer from "../components/footer";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import ProductsSwiper from "@/components/productSwiper";
import ProductCart from "@/components/productCard";

import axios from "axios";

import db from "../utils/db";

import { useMediaQuery } from "react-responsive";

import { useSession } from "next-auth/react";

import styles from "../styles/Home.module.scss";

import {
  women_dresses,
  women_shoes,
  women_accessories,
  women_swiper,
  gamingSwiper,
  homeImprovSwiper,
} from "@/data/home";

import Product from "@/models/Product";

export default function Home({ country, products }) {
  console.log("PRODUCTS:", products);
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  const { data: session } = useSession();
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            header="For Gamers"
            products={gamingSwiper}
            bg="#2f82ff"
          />
          <ProductsSwiper
            header="House Improvements"
            products={homeImprovSwiper}
            bg="#3c811f"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCart product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=echtvl7v50u3axk9")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: { name: data.name, flag: data.flag.emojitwo },
    },
  };
}
