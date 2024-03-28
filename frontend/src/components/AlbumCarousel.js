import React, { Component } from "react";
import Slider from "react-slick";

function AlbumCarousel() {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={"../testImages/David_Bowie_-_Heroes.png"} />
        </div>
        <div>
          <img src={"../testImages/David_Bowie_-_Heroes.png"} />
        </div>
        <div>
          <img src={"../testImages/David_Bowie_-_Heroes.png"} />
        </div>
        <div>
          <img src={"../testImages/David_Bowie_-_Heroes.png"} />
        </div>
      </Slider>
    </div>
  );
}

export default AlbumCarousel;