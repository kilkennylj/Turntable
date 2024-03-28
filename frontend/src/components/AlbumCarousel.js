import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function AlbumCarousel() {
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={"/assets/img/David_Bowie_-_Heroes.png"} />
        </a>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={"/assets/img/David_Bowie_-_Heroes.png"} alt="Album cover"/>
        </div>
        <div>
        <img src={"/assets/img/David_Bowie_-_Heroes.png"} alt="Album cover"/>
        </div>
        <div>
        <img src={"/assets/img/David_Bowie_-_Heroes.png"} alt="Album cover"/>
        </div>
        <div>
        <img src={"/assets/img/David_Bowie_-_Heroes.png"} alt="Album cover"/>
        </div>
      </Slider>
    </div>
  );
}

export default AlbumCarousel;