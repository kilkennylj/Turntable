import React, { useState } from 'react';
import AlbumCarousel from 'components/AlbumCarousel';


const CarouselTest = () => {
  return (
    <div className="app">
      <h1>Image Carousel Example</h1>
      <button onClick={addImage}>Add Image</button>
      <button onClick={removeImage}>Remove Image</button>
      <AlbumCarousel />
    </div>
  );
};

export default CarouselTest;