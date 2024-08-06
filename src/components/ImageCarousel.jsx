import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ref, listAll, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '../firebase';
import '../App.css';

const ImageCarousel = ({ setImages }) => {
  const [images, setImagesState] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, 'images/');
      try {
        const listResult = await listAll(storageRef);
        const urls = await Promise.all(
          listResult.items.map((item) => getDownloadURL(item))
        );
        setImagesState(urls);
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageRef = ref(storage, `images/${Date.now()}`);
        uploadString(imageRef, reader.result, 'data_url')
          .then(() => getDownloadURL(imageRef))
          .then((url) => {
            setImagesState((prevImages) => [...prevImages, url]);
          })
          .catch((error) => console.log(error));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="carousel-container">
      <Carousel autoPlay interval={3000} infiniteLoop>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`carousel ${index}`} className="carousel-image" />
          </div>
        ))}
      </Carousel>

  
    </div>
  );
};

export default ImageCarousel;
