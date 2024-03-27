import React from 'react';
import Slider from 'react-slick';
// import './ImageCarousel.css';

const ImageCarousel = ({ albums }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowInfo(true);
  };

  const handleInfoClose = () => {
    setShowInfo(false);
  };

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div>
      <Slider {...settings}>
        {albums.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} onClick={() => handleImageClick(index)} />
          </div>
        ))}
      </Slider>

      {showInfo && (
        <div className="info-modal">
          <div className="info-content">
            <h2>Album Title - Artist name</h2>
            <p>Here goes the album year.</p>
            <p>Here goes the rating of the album.</p>
            <p>Here goes the tags of the album.</p>
            <button onClick={handleInfoClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;