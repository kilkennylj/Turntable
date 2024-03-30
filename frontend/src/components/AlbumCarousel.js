import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/AlbumCarousel.css";

function AlbumCarousel() {
  const [flippedIndex, setFlippedIndex] = useState(-1); // Keep track of the flipped card index
  const [showTracklist, setShowTracklist] = useState(false); // State to manage tracklist visibility

  const handleCardClick = (index) => {
    if (index === flippedIndex) {
      // If the clicked card is already flipped, unflip it and hide the tracklist
      setFlippedIndex(-1);
      setShowTracklist(false);
    } else {
      // Otherwise, flip the clicked card and show the tracklist
      setFlippedIndex(index);
      setShowTracklist(true);
    }
  };

  const renderCardContent = (index) => {
    if (index === flippedIndex) {
      // If the card is flipped, render the back face content (album information)
      return (
        <div className="back">
          <h3>Album Title</h3>
          <p>Artist Name</p>
          <p>Release Date</p>
        </div>
      );
    } else {
      // Otherwise, render the front face content (album cover)
      return (
        <div className="front">
          <img className="carousel_img" src={`/assets/img/test_${index + 1}.jpg`} alt="Album cover" />
        </div>
      );
    }
  };

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
    centerPadding: "50px",
    speed: 500,
    slidesToShow: 3,
  };

  return (
    <div className="slider_container">
      <Slider {...settings}>
        {[1, 2, 3, 4].map((index) => (
          <div key={index} onClick={() => handleCardClick(index - 1)}>
            {renderCardContent(index - 1)}
          </div>
        ))}
      </Slider>
      {showTracklist && (
        <div className="tracklist_box">
          {/* Tracklist content */}
          <h2>Tracklist</h2>
          <ul>
            <li>Track 1</li>
            <li>Track 2</li>
            {/* Add more tracks as needed */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlbumCarousel;
