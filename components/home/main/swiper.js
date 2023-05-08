import styles from "./styles.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";

export default class MainSwiper extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true,
    };
    return (
      <div className={styles.swiper_box}>
        <Slider {...settings}>
          {[...Array(10).keys()].map((i) => {
            return (
              <div key={i}>
                <img src={`../../../images/swiper/${i + 1}.jpg`} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
