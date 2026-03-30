# 🚀 VisionExtract – AI-Based Subject Isolation Application

## 📌 Project Overview

VisionExtract is an AI-powered application designed to automatically isolate the main subject from an image by removing the background. The system uses deep learning-based image segmentation combined with post-processing techniques to produce clean and accurate outputs.

This project evolves from a basic segmentation model into a **real-world application** capable of processing unseen images through a fully automated pipeline.

---

## 🎯 Objective

- Build an AI system for automatic background removal  
- Convert segmentation model into a usable application  
- Improve output quality using post-processing  
- Enable real-time inference for users  
- Solve real-world image segmentation challenges  

---

## 🧠 Core Concept

The project is based on **Semantic Segmentation**, where each pixel in an image is classified as:

- Foreground (Subject)  
- Background  

### Key Idea:
Instead of detecting objects, the model understands the image at a **pixel level**, enabling precise subject extraction.

---

## 🏗️ System Architecture

Input Image
↓
Preprocessing (Resize + Normalize)
↓
Segmentation Model
↓
Mask Generation
↓
Post-Processing
↓
Final Output Image


---

## ⚙️ Tech Stack

### Programming:
- Python  

### Deep Learning:
- TensorFlow / Keras  
- PyTorch (optional experiments)  

### Computer Vision:
- OpenCV  

### Backend:
- FastAPI  

### Tools:
- Google Colab  
- VS Code  
- Kaggle  

### Dataset:
- COCO Dataset  

---

## 🤖 Model Architecture

The system uses segmentation models such as:

- U-Net (baseline)  
- MobileNet U-Net (transfer learning)  
- U²-Net (advanced – future scope)  

### Key Components:
- Encoder → Extract features  
- Decoder → Generate segmentation mask  
- Skip Connections → Preserve details  

---

## ⚡ Transfer Learning

MobileNetV2 is used as a pre-trained encoder:

- Trained on ImageNet  
- Extracts rich features  
- Improves performance  
- Reduces training time  

---

## 🔄 Workflow

### Step-by-Step Process:

1. User uploads an image  
2. Image is resized (128×128)  
3. Image is normalized (0–1 range)  
4. Model generates a segmentation mask  
5. Mask is converted to binary using threshold  
6. Post-processing improves mask quality  
7. Mask is applied to original image  
8. Final subject-isolated image is generated  

---

## 🧪 Data Preprocessing

- Image resizing  
- Normalization  
- Mask generation from annotations  
- Train/Validation split  

---

## 📈 Training Techniques

- Data Augmentation:
  - Flip  
  - Rotation  

- Loss Functions:
  - Binary Crossentropy  
  - Dice Loss  

- Optimization:
  - Adam Optimizer  

---

## 🧠 Advanced Training Strategies

- EarlyStopping  
- ModelCheckpoint  

### Benefits:
- Prevents overfitting  
- Saves best model  
- Improves training efficiency  

---

## 🛠️ Post-Processing Pipeline

To improve segmentation quality, the following techniques are used:

### 1. Threshold Tuning
- Converts probability mask to binary  
- Lower threshold captures fine details  

### 2. Contour Filling
- Removes holes inside subject  
- Ensures continuous segmentation  

### 3. Edge Smoothing
- Gaussian Blur / Median Blur  
- Produces natural edges  

---

## 🔬 Edge Case Analysis

### Observed Issues:
- Poor hair segmentation  
- Dark object blending with background  
- Low contrast images  

### Root Causes:
- Low resolution (128×128)  
- Dataset bias (COCO dataset)  

---

## 💡 Solutions Implemented

- Lower threshold value  
- Contour-based mask correction  
- Smoothing techniques  
- Transfer learning  

---

## ⚡ Inference Pipeline

The application performs real-time prediction using:

---

## ⚙️ Tech Stack

### Programming:
- Python  

### Deep Learning:
- TensorFlow / Keras  
- PyTorch (optional experiments)  

### Computer Vision:
- OpenCV  

### Backend:
- FastAPI  

### Tools:
- Google Colab  
- VS Code  
- Kaggle  

### Dataset:
- COCO Dataset  

---

## 🤖 Model Architecture

The system uses segmentation models such as:

- U-Net (baseline)  
- MobileNet U-Net (transfer learning)  
- U²-Net (advanced – future scope)  

### Key Components:
- Encoder → Extract features  
- Decoder → Generate segmentation mask  
- Skip Connections → Preserve details  

---

## ⚡ Transfer Learning

MobileNetV2 is used as a pre-trained encoder:

- Trained on ImageNet  
- Extracts rich features  
- Improves performance  
- Reduces training time  

---

## 🔄 Workflow

### Step-by-Step Process:

1. User uploads an image  
2. Image is resized (128×128)  
3. Image is normalized (0–1 range)  
4. Model generates a segmentation mask  
5. Mask is converted to binary using threshold  
6. Post-processing improves mask quality  
7. Mask is applied to original image  
8. Final subject-isolated image is generated  

---

## 🧪 Data Preprocessing

- Image resizing  
- Normalization  
- Mask generation from annotations  
- Train/Validation split  

---

## 📈 Training Techniques

- Data Augmentation:
  - Flip  
  - Rotation  

- Loss Functions:
  - Binary Crossentropy  
  - Dice Loss  

- Optimization:
  - Adam Optimizer  

---

## 🧠 Advanced Training Strategies

- EarlyStopping  
- ModelCheckpoint  

### Benefits:
- Prevents overfitting  
- Saves best model  
- Improves training efficiency  

---

## 🛠️ Post-Processing Pipeline

To improve segmentation quality, the following techniques are used:

### 1. Threshold Tuning
- Converts probability mask to binary  
- Lower threshold captures fine details  

### 2. Contour Filling
- Removes holes inside subject  
- Ensures continuous segmentation  

### 3. Edge Smoothing
- Gaussian Blur / Median Blur  
- Produces natural edges  

---

## 🔬 Edge Case Analysis

### Observed Issues:
- Poor hair segmentation  
- Dark object blending with background  
- Low contrast images  

### Root Causes:
- Low resolution (128×128)  
- Dataset bias (COCO dataset)  

---

## 💡 Solutions Implemented

- Lower threshold value  
- Contour-based mask correction  
- Smoothing techniques  
- Transfer learning  

---

## ⚡ Inference Pipeline

The application performs real-time prediction using:

---

## ⚙️ Tech Stack

### Programming:
- Python  

### Deep Learning:
- TensorFlow / Keras  
- PyTorch (optional experiments)  

### Computer Vision:
- OpenCV  

### Backend:
- FastAPI  

### Tools:
- Google Colab  
- VS Code  
- Kaggle  

### Dataset:
- COCO Dataset  

---

## 🤖 Model Architecture

The system uses segmentation models such as:

- U-Net (baseline)  
- MobileNet U-Net (transfer learning)  
- U²-Net (advanced – future scope)  

### Key Components:
- Encoder → Extract features  
- Decoder → Generate segmentation mask  
- Skip Connections → Preserve details  

---

## ⚡ Transfer Learning

MobileNetV2 is used as a pre-trained encoder:

- Trained on ImageNet  
- Extracts rich features  
- Improves performance  
- Reduces training time  

---

## 🔄 Workflow

### Step-by-Step Process:

1. User uploads an image  
2. Image is resized (128×128)  
3. Image is normalized (0–1 range)  
4. Model generates a segmentation mask  
5. Mask is converted to binary using threshold  
6. Post-processing improves mask quality  
7. Mask is applied to original image  
8. Final subject-isolated image is generated  

---

## 🧪 Data Preprocessing

- Image resizing  
- Normalization  
- Mask generation from annotations  
- Train/Validation split  

---

## 📈 Training Techniques

- Data Augmentation:
  - Flip  
  - Rotation  

- Loss Functions:
  - Binary Crossentropy  
  - Dice Loss  

- Optimization:
  - Adam Optimizer  

---

## 🧠 Advanced Training Strategies

- EarlyStopping  
- ModelCheckpoint  

### Benefits:
- Prevents overfitting  
- Saves best model  
- Improves training efficiency  

---

## 🛠️ Post-Processing Pipeline

To improve segmentation quality, the following techniques are used:

### 1. Threshold Tuning
- Converts probability mask to binary  
- Lower threshold captures fine details  

### 2. Contour Filling
- Removes holes inside subject  
- Ensures continuous segmentation  

### 3. Edge Smoothing
- Gaussian Blur / Median Blur  
- Produces natural edges  

---

## 🔬 Edge Case Analysis

### Observed Issues:
- Poor hair segmentation  
- Dark object blending with background  
- Low contrast images  

### Root Causes:
- Low resolution (128×128)  
- Dataset bias (COCO dataset)  

---

## 💡 Solutions Implemented

- Lower threshold value  
- Contour-based mask correction  
- Smoothing techniques  
- Transfer learning  

---

## ⚡ Inference Pipeline

The application performs real-time prediction using:

Input Image → Model → Mask → Post-processing → Output


### Features:
- Works on unseen images  
- Fully automated  
- Fast execution  

---

## 🧩 Application Features

- Upload image  
- Automatic background removal  
- Real-time processing  
- Download final output  
- Clean and smooth results  

---

## 📊 Performance Evaluation

### Metrics:
- IoU (Intersection over Union)  

### Evaluation Type:
- Quantitative (IoU score)  
- Qualitative (visual comparison)  

---

## 📸 Output

The system generates:

- Original Image  
- Segmentation Mask  
- Final Subject-Isolated Image  

---

## ⚠️ Challenges Faced

- Handling large dataset  
- Model overfitting  
- Poor edge detection  
- Background similarity issues  

---

## 🚀 Future Scope

- High-resolution processing (256×256 / 512×512)  
- Real-time video segmentation  
- Mobile application deployment  
- Integration of U²-Net  
- Cloud-based API service  

---

## 🔮 Advanced Improvements

- Alpha matting (soft masks)  
- Edge refinement models  
- Better datasets (portrait-specific)  

---

## 🧠 Real-World Applications

- Photo editing tools  
- E-commerce product images  
- Social media content creation  
- Medical imaging  


---

## 👨‍💻 Team Members

- Rahul Raj  
- Sai Jannawar  
- Rishikesh P  

---

## 🎯 Conclusion

VisionExtract successfully demonstrates:

- End-to-end AI pipeline  
- Deep learning-based segmentation  
- Real-world application deployment  
- Automated subject isolation  

The project evolves from a basic academic model into a **practical AI solution** capable of solving real-world problems efficiently.

---