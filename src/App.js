import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadImage from './components/UploadImage';
import ImageCarousel from './components/ImageCarousel';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UploadImage setImages={setImages} />} />
          <Route path="/carousel" element={<ImageCarousel images={images} setImages={setImages} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
