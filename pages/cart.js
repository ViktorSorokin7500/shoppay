import styles from "../styles/cart.module.scss";

import Empty from "@/components/cart/empty";
import Header from "../components/cart/header";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productSwiper";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

import { women_swiper, gamingSwiper, homeImprovSwiper } from "@/data/home";
import { saveCart } from "@/requests/user";
import { updateCart } from "@/store/cartSlice";

export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   const update = async () => {
  //     const { data } = await axios.post("/api/updateCart", {
  //       products: cart.cartItems,
  //     });
  //     dispatch(updateCart(data));
  //   };
  //   if (cart.cartItems.length > 0) {
  //     update();
  //   }
  // }, []);

  useEffect(() => {
    setShippingFee(selected.reduce((a, c) => a + c.shipping, 0));
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0));
    setTotal(selected.reduce((a, c) => a + c.price * c.qty, 0) + shippingFee);
  }, [selected]);

  const saveCatToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <>
      <Header country="" />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal.toFixed(2)}
              shippingFee={
                typeof shippingFee === "number" ? shippingFee.toFixed(2) : 0
              }
              total={total.toFixed(2)}
              selected={selected}
              saveCatToDbHandler={saveCatToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}

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
      </div>
    </>
  );
}
