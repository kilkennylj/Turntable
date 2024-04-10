import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../styles/AlbumCarousel.css";
import AlbumFunctions from "../../frontAPI/AlbumFunctions";
import StarRating from "./StarRating";

function AlbumCarousel({ onDelete }) {
  const { albums, loading, updateAlbumRating } = AlbumFunctions();
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
  }, [albums.length]);

  const handleCardClick = (index) => {
    if (index === flippedIndex) {
      setFlippedIndex(-1);
      setShowTracklist(false);
    } else {
      setFlippedIndex(index);
      setShowTracklist(true);
    }
  };

  const handleRatingChange = (index, newRating) => {
    const albumName = albums[index].albumName;
    updateAlbumRating(albumName, newRating);
  };


  const renderCardContent = (index) => {
    const album = albums[index];
    const isTemplateAlbum = album.rating === -2;
    const isNewAlbum = album.rating === -1;

    if (index === flippedIndex) {
      return (
        <div className="back">
          <h3 className="title">{album.albumName}</h3>
          <p className="artist">{album.artistName}</p>
          <p className="release">{album.albumYear}</p>
          <p className="tags">{album.albumTags.join(", ")}</p>
          {!isTemplateAlbum && (
            <>
              <StarRating initialRating={isNewAlbum ? 0 : album.rating} onChange={(newRating) => handleRatingChange(index, newRating)} />
              <div className="delete_div">
                <button className="delete_button" onClick={() => onDelete(album.albumName)}>X</button>
              </div>
            </>
          )}
          {isTemplateAlbum && (
            <p className="suggest">You can rate your albums out of five stars!</p>
          )}

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
      if (!albums[i]) {
        i = i - 1;
      }
      const album = albums[i];
      return (
        <a href={album.link}>
          <img className="carousel_thumbnail" src={album.coverImage} alt="Album cover" />
        </a>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    centerMode: true,
    centerPadding: "0px",
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
      {/* If there is no tracklist (template album), this is ignored */}
      {showTracklist && albums[flippedIndex]?.tracklists[0]?.tracks && (
        <div className="tracklist_box">
          <h2>Tracklist</h2>
          <ul className="tracklist">
            {albums[flippedIndex].tracklists[0].tracks.map((track, index) => (
              <li key={index}>
                {index + 1}. {track.name} - {Math.floor(track.length / 60)}:{(track.length % 60) < 10 ? '0' + (track.length % 60) : (track.length % 60)}
              </li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
}

export default AlbumCarousel;
