import React, { useState } from "react";
import axios from "axios";
import Base64decode from "../components/Base64Decode";

const Home = () => {
  const [img, setImg] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  async function handleImageUpload(e) {
    e.preventDefault();
    console.log(img);
    const formData = new FormData();
    formData.append("image", img);

    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/get-processed-image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
      //   const data = response.json();
      console.log("Response:", response);
      console.log("Response:", response.data.message);
      setImageUrl(response.data.message);
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

      {imageUrl && (
        <>
          <Base64decode base64String={imageUrl} />
          <a href={imageUrl} download="image.jpg">
            <button>Download Image</button>
          </a>
        </>
      )}
    </div>
  );
};

export default Home;
