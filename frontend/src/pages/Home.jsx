import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [img, setImg] = useState(null);

  async function handleImageUpload(e) {
    e.preventDefault();
    console.log(img);
    const formData = new FormData();
    formData.append("image", img);

    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/imageUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
      // console.log("Response:", response.data);
      // alert("Product added successfully");
      // Handle response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  }
  return (
    <div>
      <h1>Hellow rold</h1>

      <input
        type="file"
        accept="image/*"
        id="file-upload"
        name="myFile"
        required
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={handleImageUpload}>Upload Image</button>

      {/* <a href={} download="downloaded_image.jpg">
        <button>Download Image</button>
      </a> */}
    </div>
  );
};

export default Home;
