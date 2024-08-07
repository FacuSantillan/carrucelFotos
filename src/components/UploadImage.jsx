import React, { useState } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import texto from '../texto.png';
import foto from '../imagen.png';

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
        setIsImageSelected(true); // Cambia el estado al seleccionar una imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (preview) {
      const imageRef = ref(storage, `images/${Date.now()}`);
      uploadString(imageRef, preview, 'data_url').then(() => {
        getDownloadURL(imageRef).then(url => {
          setImages(prevImages => [...prevImages, url]);
          setPreview(null); // Clear the preview after upload
          setIsImageSelected(false); // Restablece el estado después de cargar la imagen
          setUploadSuccess(true); // Muestra el mensaje de éxito
          setTimeout(() => setUploadSuccess(false), 3000); // Oculta el mensaje después de 3 segundos
        });
      }).catch(error => console.log(error));
    }
  };

  return (
    <div className="upload-container">
      <img src={texto} className='texto-imagen'/>
      <img src={foto} className='imagen'/>
      <h2 className='texto'>Comparte tus momentos!</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <button onClick={() => {
        if (isImageSelected) {
          handleUpload();
        } else {
          document.getElementById('fileInput').click();
        }
      }}>
        {isImageSelected ? 'Publicar' : 'Seleccionar Foto'}
      </button>
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
    </div>
  );
};

export default UploadImage;
