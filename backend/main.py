from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import onnxruntime as ort
import numpy as np
import cv2
from PIL import Image
import io
import os
import urllib.request
import base64

# 1. Start the API Server
app = FastAPI(title="VisionExtract Pro API")

# 2. Strict Enterprise CORS Security
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vision-extract-enterprise.vercel.app",           # Your main domain
        "https://vision-extract-enterprise-72h0t9xmc.vercel.app", # Your preview domain
        "http://localhost:5173"                                   # For local testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Auto-Download the AI Brain (UPGRADED TO HUMAN-SPECIFIC MODEL)
model_path = "u2net_human_seg.onnx"
model_url = "https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx"

if not os.path.exists(model_path):
    print("📦 First boot detected! Downloading U²-Net Human Segmentation Brain...")
    urllib.request.urlretrieve(model_url, model_path)
    print("✅ Download complete!")

session = ort.InferenceSession(model_path)
print("🚀 API Server is online!")

# 4. The Core Endpoint
@app.post("/api/isolate")
async def process_image(file: UploadFile = File(...)):
    
    image_bytes = await file.read()

    # --- INGESTION ---
    pil_img = Image.open(io.BytesIO(image_bytes))
    if pil_img.mode != "RGB":
        pil_img = pil_img.convert("RGB")
        
    original_img_rgb = np.array(pil_img)
    original_h, original_w = original_img_rgb.shape[:2]

    # --- MATH & INFERENCE ---
    img_resized = cv2.resize(original_img_rgb, (320, 320))
    img_normalized = img_resized / np.max(img_resized)
    img_normalized[:, :, 0] = (img_normalized[:, :, 0] - 0.485) / 0.229
    img_normalized[:, :, 1] = (img_normalized[:, :, 1] - 0.456) / 0.224
    img_normalized[:, :, 2] = (img_normalized[:, :, 2] - 0.406) / 0.225
    img_tensor = np.transpose(img_normalized, (2, 0, 1))
    img_tensor = np.expand_dims(img_tensor, axis=0).astype(np.float32)

    input_name = session.get_inputs()[0].name
    raw_output = session.run(None, {input_name: img_tensor})
    pred_mask = raw_output[0][0, 0, :, :]

    # --- POST-PROCESSING ---
    # 1. Scale the raw output back up to HD resolution
    pred_mask = (pred_mask - np.min(pred_mask)) / (np.max(pred_mask) - np.min(pred_mask))
    hd_mask = cv2.resize(pred_mask, (original_w, original_h), interpolation=cv2.INTER_LINEAR)

    # 2. CREATE THE PURE BINARY MASK (White Subject, Black Background)
    # Lowered threshold to 0.2 to capture complex clothing and hair
    binary_mask = (hd_mask > 0.2).astype(np.uint8) * 255

    # 3. Create the Final Isolated Image
    hd_mask_3d = np.expand_dims(hd_mask, axis=-1)
    black_bg = np.zeros_like(original_img_rgb)
    final_result = (original_img_rgb * hd_mask_3d + black_bg * (1 - hd_mask_3d)).astype(np.uint8)

    # --- BASE64 PACKAGING ---
    # Convert Mask to Base64 String
    mask_pil = Image.fromarray(binary_mask, mode="L")
    mask_buf = io.BytesIO()
    mask_pil.save(mask_buf, format="PNG")
    mask_b64 = base64.b64encode(mask_buf.getvalue()).decode('utf-8')

    # Convert Result to Base64 String
    result_pil = Image.fromarray(final_result)
    result_buf = io.BytesIO()
    result_pil.save(result_buf, format="PNG")
    result_b64 = base64.b64encode(result_buf.getvalue()).decode('utf-8')
    
    # Shoot BOTH images back to React inside a JSON dictionary!
    return {
        "mask_image": mask_b64,
        "result_image": result_b64
    }