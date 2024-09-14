import React, { useContext, useState } from "react";
import axios from "axios";
import { ImageContext } from "../context/Base64Decode";

const Home = () => {
  const [img, setImg] = useState(null);

  const { base64String, setBase64String, imageUrl } = useContext(ImageContext);
  //   const [imageUrl1, setImageUrl] = useState("");

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
      //   setImageUrl(response.data.message);
      setBase64String(response.data.message);
      // console.log("Response:", response.data);
      // alert("Product added successfully");
      // Handle response as needed
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          name="myFile"
          required
          onChange={(e) => setImg(e.target.files[0])}
          className="mb-4" // Add margin-bottom for spacing
        />
      </div>
      <button
        className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleImageUpload}
      >
        Upload Image
      </button>

      {imageUrl && (
        <>
          <a href={imageUrl} download="image.jpg">
            <button className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition-colors">
              Download Image
            </button>
          </a>
        </>
      )}
    </div>
  );
};

export default Home;
