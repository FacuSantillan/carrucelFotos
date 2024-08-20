import React, { useState } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import texto from '../texto.png';
import foto from '../imagen.png';
import logo1 from '../logo1.png';
import logo2 from '../logo2.jpg'


const UploadImage = ({ setImages }) => {
  const [preview, setPreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setIsImageSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (preview) {
      const imageRef = ref(storage, `carrucel/${Date.now()}`);
      uploadString(imageRef, preview, 'data_url').then(() => {
        getDownloadURL(imageRef).then(url => {
          setImages(prevImages => [...prevImages, url]);
          setPreview(null);
          setIsImageSelected(false);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        });
      }).catch(error => console.log(error));
    }
  };

  const handleChangeImage = () => {
    setPreview(null);
    setIsImageSelected(false);
    document.getElementById('fileInput').click(); // Abre nuevamente el selector de archivos
  };

  return (
    <div className="upload-container">
      <img src={texto} className='texto-imagen'/>
      <img src={foto} className='imagen'/>
      <h2 className='texto'>¡Comparte tus momentos!</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      {isImageSelected ? (
        <>
          <button className="upload-button" onClick={handleUpload}>Publicar</button>
          <button className="change-button" onClick={handleChangeImage}>Cambiar Imagen</button>
        </>
      ) : (
        <button onClick={() => document.getElementById('fileInput').click()}>
          Seleccionar Foto
        </button>
      )}
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Image Preview" className="image-preview" />
        </div>
      )}
      {uploadSuccess && (
        <div className="success-message">
          ¡Imagen subida con éxito!
        </div>
      )}
      <img src={logo1} alt="Logo" className='imagen-logo'/>
    </div>
  );
};

export default UploadImage;
