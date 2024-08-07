import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import '../App.css';

const ImageCarousel = () => {
  const [images, setImagesState] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, 'images/');
      try {
        const listResult = await listAll(storageRef);
        const urls = await Promise.all(
          listResult.items.map((item) => getDownloadURL(item))
        );
        setImagesState(urls.reverse()); // Reverse the order to make the newest image first
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };

    fetchImages();
    
    const interval = setInterval(fetchImages, 5000); // Polling every 5 seconds to check for new images

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          setImagesState((prevImages) => [url, ...prevImages]); // Add the new image URL at the beginning
        })
        .catch((error) => console.log('Error uploading image:', error));
    });
  };

  return (
    <div className="carousel-container">
      <Carousel 
        autoPlay 
        interval={4000} 
        infiniteLoop 
        showThumbs={false} 
        stopOnHover={false}  // Desactiva la pausa al pasar el ratón por encima
      >
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`carousel ${index}`} className="carousel-image" />
          </div>
        ))}
      </Carousel>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="addMoreImages"
      />
      <label htmlFor="addMoreImages" className="add-image-label">
        Añadir Imágenes
      </label>
    </div>
  );
};

export default ImageCarousel;
