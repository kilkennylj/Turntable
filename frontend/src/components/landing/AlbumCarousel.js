import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../styles/AlbumCarousel.css";
import AlbumFunctions from "../../frontAPI/AlbumFunctions";

function AlbumCarousel() {
  const { albums, loading, handleDelete } = AlbumFunctions();
  const [flippedIndex, setFlippedIndex] = useState(-1);
  const [showTracklist, setShowTracklist] = useState(false);

  useEffect(() => {
    setFlippedIndex(-1);
    setShowTracklist(false);
  }, [albums]);

  const handleCardClick = (index) => {
    if (index === flippedIndex) {
      setFlippedIndex(-1);
      setShowTracklist(false);
    } else {
      setFlippedIndex(index);
      setShowTracklist(true);
    }
  };

  const renderCardContent = (index) => {
    const album = albums[index];
    if (index === flippedIndex) {
      return (
        <div className="back">
          <h3 className="title">{album.albumName}</h3>
          <p className="artist">{album.artistName}</p>
          <p className="release">{album.albumYear}</p>
          <p className="tags">{album.albumTags.join(", ")}</p>
          {/* Review solution goes here */}
          <div className="delete_div">
            <button className="delete_button" onClick={() => handleDelete()}>X</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="front">
          <img className="carousel_img" src={album.coverImage} alt="Album cover" />
        </div>
      );
    }
  };

  const settings = {
    customPaging: function (i) {
      const album = albums[i];
      return (
        <a>
          <img className="carousel_thumbnail" src={album.coverImage} alt="Album cover" />
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="slider_container">
      <div className="carousel_box">
        <Slider {...settings}>
          {albums.map((album, index) => (
            <div key={index} onClick={() => handleCardClick(index)}>
              {renderCardContent(index)}
            </div>
          ))}
        </Slider>
      </div>
      {showTracklist && (
        <div className="tracklist_box">
          <h2>Tracklist</h2>
          <ul>
            {albums[flippedIndex].Tracks.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlbumCarousel;
