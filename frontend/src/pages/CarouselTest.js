import React, { useState } from 'react';
import ImageCarousel from 'components/ImageCarousel';

const CarouselTest = () => {
  const [images, setImages] = useState([
    { src: 'frontend/src/components/testImages/David_Bowie_-_Heroes.png', alt: 'Image 1' },
    { src: 'frontend/src/components/testImages/David_Bowie_-_Heroes.png', alt: 'Image 2' },
    { src: 'frontend/src/components/testImages/David_Bowie_-_Heroes.png', alt: 'Image 3' },
  ]);

  const addImage = () => {
    const newImage = { src: 'image4.jpg', alt: 'Image 4' }; // Example new image
    setImages([...images, newImage]);
  };

  const removeImage = () => {
    setImages(images.slice(0, -1)); // Remove the last image from the list
  };

  return (
    <div className="app">
      <h1>Image Carousel Example</h1>
      <button onClick={addImage}>Add Image</button>
      <button onClick={removeImage}>Remove Image</button>
      <ImageCarousel images={images} />
    </div>
  );
};

export default CarouselTest;