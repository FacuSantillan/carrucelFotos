import React, { useState } from 'react';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const UploadImage = ({ setImages }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
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
        });
      }).catch(error => console.log(error));
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <button onClick={() => document.getElementById('fileInput').click()}>
        Seleccionar Foto
      </button>
      {preview && (
        <>
          <div className="preview-container">
            <img src={preview} alt="Image Preview" className="image-preview" />
          </div>
          <button onClick={handleUpload}>Publicar</button>
        </>
      )}
    </div>
  );
};

export default UploadImage;
