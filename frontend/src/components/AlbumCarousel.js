import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/AlbumCarousel.css";


function AlbumCarousel() {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img className="carousel_thumbnail" src={`/assets/img/test_${1+i}.jpg`} />
        </a>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    centerMode: true,
    centerPadding: "0px",
    speed: 500,
    slidesToShow: 3,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className="carousel_img" src={"/assets/img/test_1.jpg"} alt="Album cover"/>
        </div>
        <div>
        <img className="carousel_img" src={"/assets/img/test_2.jpg"} alt="Album cover"/>
        </div>
        <div>
        <img className="carousel_img" src={"/assets/img/test_3.jpg"} alt="Album cover"/>
        </div>
        <div>
        <img className="carousel_img" src={"/assets/img/test_4.jpg"} alt="Album cover"/>
        </div>
      </Slider>
    </div>
  );
}

export default AlbumCarousel;