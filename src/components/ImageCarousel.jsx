import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
    >
      {images.map((image, index) => {
        const isVertical = image.height > image.width;
        const imageClass = isVertical ? 'vertical' : 'horizontal';

        return (
          <div key={index} className="slide">
            <img src={image.url} alt={`Slide ${index}`} className={imageClass} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageCarousel;
