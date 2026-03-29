import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // We now have TWO states for the TWO images!
  const [maskUrl, setMaskUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setMaskUrl(null); // Clear the old mask!
    document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });
  };

  const handleProcessImage = async () => {
    if (!selectedFile) return;
    setLoading(true);

    try {
      // --- THE RAM SAVER: Compress Image Before Sending ---
      const imageBitmap = await createImageBitmap(selectedFile);
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800; // This guarantees Render's 512MB RAM won't crash!
      
      let width = imageBitmap.width;
      let height = imageBitmap.height;
      
      if (width > MAX_WIDTH) {
        height = Math.floor(height * (MAX_WIDTH / width));
        width = MAX_WIDTH;
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imageBitmap, 0, 0, width, height);
      
      // Convert back to a lightweight JPEG file
      const compressedBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
      
      // --- SEND TO FASTAPI ---
      const formData = new FormData();
      formData.append("file", compressedBlob, "compressed.jpg");

      // Make sure this is your active Render URL!
      const response = await axios.post("https://visionextract-enterprise.onrender.com/api/isolate", formData);
      
      // Unpack the Base64 strings from the JSON and turn them into image URLs
      setMaskUrl(`data:image/png;base64,${response.data.mask_image}`);
      setResultUrl(`data:image/png;base64,${response.data.result_image}`);
      
    } catch (error) {
      console.error("Error connecting to AI Server:", error);
      alert("❌ AI Engine failed. Check Render logs to see if it crashed out of memory!");
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className="google-mesh-bg"></div>

      <nav className="navbar glass-panel">
        <div className="nav-brand" onClick={() => scrollTo('home')}>
          <span className="logo-icon">✂️</span> VisionExtract <span className="text-gradient">Pro</span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollTo('home')}>Home</button>
          <button onClick={() => scrollTo('workspace')}>Studio</button>
          <button onClick={() => scrollTo('architecture')}>Architecture</button>
          <button onClick={() => scrollTo('metrics')}>Metrics</button>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-content glass-panel">
          <div className="badge">Group 4</div>
          <h1 className="hero-title">Automated Subject <span className="text-gradient">Isolation</span></h1>
          <p className="hero-subtitle">
            Upload any input picture, and our Deep Learning model will output a new image where only the subject is visible and everything else is rendered completely black.
          </p>
          <button className="primary-btn" onClick={() => scrollTo('workspace')}>Enter AI Studio</button>
        </div>
      </section>

      <section id="workspace" className="tool-section">
        <div className="section-header">
          <h2>Neural Studio</h2>
          <p>Drag and drop a high-resolution portrait to begin semantic segmentation.</p>
        </div>

        <div className={`upload-dropzone glass-panel ${dragActive ? "drag-active" : ""}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
          <input type="file" accept="image/*" onChange={handleChange} id="file-upload" className="file-input" />
          <label htmlFor="file-upload" className="dropzone-label">
            <div className="dropzone-content">
              <div className="upload-icon">☁️</div>
              <h3>Drag & Drop your image here</h3>
              <p>or click to browse your files</p>
            </div>
          </label>
        </div>

        {previewUrl && (
          <div className="workspace-grid">
            {/* STAGE 1: ORIGINAL */}
            <div className="image-card glass-panel">
              <div className="card-header"><span className="step-badge">1</span><h3>Original Image</h3></div>
              <img src={previewUrl} alt="Original" className="preview-img" />
              {!resultUrl && (
                <button className="process-btn" onClick={handleProcessImage} disabled={loading}>
                  {loading ? "Initializing Tensor Math..." : "Extract Subject"}
                </button>
              )}
            </div>

            {/* STAGE 2: PURE BINARY MASK */}
            {(loading || maskUrl) && (
              <div className="image-card glass-panel fade-in">
                <div className="card-header"><span className="step-badge">2</span><h3>Segmentation Mask</h3></div>
                {loading ? (
                  <div className="calculating-box"><div className="spinner"></div><p>Generating Binary Mask...</p></div>
                ) : (
                  <div className="mask-visualizer">
                    {/* Notice we are using maskUrl here, with NO fake CSS filters! */}
                    <img src={maskUrl} alt="Binary Mask" className="preview-img" style={{background: 'black'}} />
                  </div>
                )}
              </div>
            )}

            {/* STAGE 3: ISOLATED RESULT */}
            {resultUrl && (
              <div className="image-card glass-panel fade-in">
                <div className="card-header"><span className="step-badge">3</span><h3>Isolated Result</h3></div>
                <img src={resultUrl} alt="Extracted Subject" className="preview-img" />
                <a href={resultUrl} download="visionextract_pro.png" className="download-btn">Download HD Image</a>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ARCHITECTURE & METRICS SECTIONS (Unchanged) */}
      <section id="architecture" className="info-section">
        <div className="section-header"><h2>System Architecture</h2><p>Decoupled Web Application & REST API Pipeline</p></div>
        <div className="grid-3">
          <div className="info-card glass-panel"><h3>1. Web Application</h3><p>User Interface transmits the Image as a Blob via HTTP Request to the cloud server.</p></div>
          <div className="info-card glass-panel"><h3>2. Backend REST API</h3><p>FastAPI Normalizes the image tensor and routes it to the Image Segmentation Model.</p></div>
          <div className="info-card glass-panel"><h3>3. Segmentation</h3><p>Generates Segmentation Mask Pixels. Outputs new image with black bg and subject.</p></div>
        </div>
      </section>

      <section id="metrics" className="info-section">
        <div className="section-header"><h2>Evaluation Metrics</h2><p>Quantitative Performance of Subject Isolation</p></div>
        <div className="grid-2">
          <div className="info-card glass-panel"><h3 className="text-gradient">Intersection over Union (IoU)</h3><p>Measures the overlap between the predicted subject region and the ground-truth mask divided by their union. High IoU indicates better segmentation accuracy.</p></div>
          <div className="info-card glass-panel"><h3 className="text-gradient">Dice Coefficient & Accuracy</h3><p>Measures the alignment and quality of predicted masks, especially useful for pixel-wise binary separation tasks.</p></div>
        </div>
      </section>

      <footer className="glass-panel"><p><strong>VisionExtract Pro</strong> • Developed by Sai • Rahul • Rishikesh</p></footer>
    </div>
  );
}

export default App;