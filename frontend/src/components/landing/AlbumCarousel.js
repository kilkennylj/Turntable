import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../styles/AlbumCarousel.css";
import AlbumFunctions from "../../frontAPI/AlbumFunctions";

function AlbumCarousel() {
  const { albums, loading, deleteAlbum } = AlbumFunctions();
  const [flippedIndex, setFlippedIndex] = useState(-1);
  const [showTracklist, setShowTracklist] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    setFlippedIndex(-1);
    setShowTracklist(false);

    // Set slidesToShow based on the number of albums
    if (albums.length > 0) {
      setSlidesToShow(Math.min(albums.length, 3));
    }
  }, []);

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
            <button className="delete_button" onClick={() => deleteAlbum(album.albumName)}>X</button>
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
    slidesToShow: slidesToShow,
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
      {showTracklist && albums[flippedIndex]?.tracklists[0]?.tracks && (
        <div className="tracklist_box">
          <h2>Tracklist</h2>
          <ul>
            {albums[flippedIndex].tracklists[0].tracks.map((track, index) => {
              return (
                <li key={index}>
                  {track.name} - {Math.floor(track.length / 60)}:{(track.length % 60) < 10 ? '0' + (track.length % 60) : (track.length % 60)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlbumCarousel;
