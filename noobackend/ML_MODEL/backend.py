from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
import cv2
from srcnn_module import predict
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Function to convert image array to base64 string
def image_to_base64(image):
    _, buffer = cv2.imencode('.jpg', image)
    return base64.b64encode(buffer).decode('utf-8')

# Endpoint to accept image and run SRCNN
@app.route('/process_image', methods=['POST'])
def process_image():
    # Check if an image is sent in the request
    print(2)
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    # Load image from request
    image_file = request.files['image']
    image = Image.open(image_file)
    
    # Convert the image to a numpy array (OpenCV format)
    image_np = np.array(image)

    # Check if the image has an alpha channel and remove it
    if image_np.shape[2] == 4:
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGBA2RGB)

    # Call the predict function (replace 'srcnn_weights.h5' with the actual path to your model weights)
    img , zoomed_img, super_res_img = predict(image_np, model_weights_path='./3051crop_weight_200.h5')

    # Convert the images to base64 encoded strings for returning as JSON
    img_base64 = image_to_base64(img)
    zoomed_img_base64 = image_to_base64(zoomed_img)
    super_res_img_base64 = image_to_base64(super_res_img)

    return jsonify({
        'initial_image':img_base64,
        'zoomed_image': zoomed_img_base64,
        'super_resolved_image': super_res_img_base64
    })

if __name__ == '__main__':
    app.run(debug=True)
