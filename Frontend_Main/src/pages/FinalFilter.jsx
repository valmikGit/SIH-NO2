// import React, { useEffect, useState, useContext } from "react";
// import { ImageContext } from "../context/Base64Decode";

// function FinalFilter() {
//   const [selectedImage, setSelectedImage] = useState(null); // For image preview
//   const [zoomedImage, setZoomedImage] = useState(null);
//   const [zoomed_image_url, setZoomed_Image_Url] = useState("");
//   const [superResImage_url, setSuperResImage_Url] = useState("");
//   const [superResImage, setSuperResImage] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   // const { base64String, setBase64String, imageUrl, } = useContext(ImageContext);
//   const { setBase64Strings, imageUrls } = useContext(ImageContext);
//   const [inputBase64, setInputBase64] = useState("");

//   const handleAddImage = () => {
//     setBase64Strings((prev) => [...prev, inputBase64]);
//     setInputBase64("");
//   };

//   // Handle file input changes and preview the image
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(URL.createObjectURL(file)); // Create local URL for preview
//   };

//   // Handle image submission
//   const handleImageSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     const imageFile = e.target.elements.image.files[0];
//     formData.append("image", imageFile);

//     setLoading(true); // Set loading to true

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/get-processed-image/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         console.log(result);

//         setZoomed_Image_Url(setBase64String(result.zoomed_img_base64));
//         setSuperResImage_Url(setBase64String(result.super_res_img_base64));
//         // Set base64 images to the state
//         // setZoomedImage(`data:image/jpeg;base64,${result.zoomed_image}`);
//         // setSuperResImage(
//         // `data:image/jpeg;base64,${result.super_resolved_image}`
//         // );
//       } else {
//         setError("Error processing the image");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while processing the image");
//     } finally {
//       setLoading(false); // Set loading to false when processing is complete
//     }
//   };

//   // Clear the form and reset state
//   const handleClear = () => {
//     setSelectedImage(null);
//     setZoomedImage(null);
//     setSuperResImage(null);
//     setError("");
//     setLoading(false);
//   };

//   useEffect(() => {
//     console.log(zoomed_image_url, superResImage_url);
//   }, [zoomed_image_url, superResImage_url]);

//   return (
//     <div className="App">
//       <h2>Upload Image for SRCNN Super Resolution</h2>

//       {/* Form for image upload */}
//       {!superResImage && (
//         <form onSubmit={handleImageSubmit}>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             required
//             onChange={handleImageChange}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Submit
//           </button>
//         </form>
//       )}

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Display image preview */}
//       {selectedImage && (
//         <div className="preview">
//           <h4>Selected Image Preview:</h4>
//           <img src={selectedImage} alt="Selected" />
//         </div>
//       )}
//       {zoomedImage && (
//         <button type="button" onClick={handleClear} disabled={loading}>
//           Clear
//         </button>
//       )}

//       {/* Loading Spinner */}
//       {loading && <div className="spinner">Processing Image...</div>}

//       <br />

//       {/* Display results side by side if available */}
//       {(zoomedImage || superResImage) && (
//         <div id="result">
//           <h3>Results</h3>
//           <div className="image-row">
//             {zoomedImage && (
//               <div className="image-container">
//                 <h4>Zoomed Image:</h4>
//                 <a
//                   href={zoomedImage}
//                   download="zoomed_image.jpg"
//                   className="download-link"
//                 >
//                   <img src={zoomed_image_url} alt="Zoomed" />
//                 </a>
//               </div>
//             )}

//             {superResImage && (
//               <div className="image-container">
//                 <h4>Super-Resolved Image:</h4>
//                 <a
//                   href={superResImage}
//                   download="super_resolved_image.jpg"
//                   className="download-link"
//                 >
//                   <img src={setSuperResImage_Url} alt="Super Resolved" />
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FinalFilter;

import React, { useEffect, useState, useContext } from "react";
import { ImageContext } from "../context/Base64Decode";

function FinalFilter() {
  const [selectedImage, setSelectedImage] = useState(null); // For image preview
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Use the ImageContext to access the base64 and image URL array
  const { setBase64Strings, imageUrls } = useContext(ImageContext);
  const [inputBase64, setInputBase64] = useState("");

  // Handle file input changes and preview the image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Create local URL for preview
  };

  // Handle image submission
  const handleImageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = e.target.elements.image.files[0];
    formData.append("image", imageFile);

    setLoading(true); // Set loading to true

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/get-processed-image/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        // Add the received base64 strings to the ImageContext
        setBase64Strings((prev) => [
          ...prev,
          result.zoomed_img_base64,
          result.super_res_img_base64,
        ]);
      } else {
        setError("Error processing the image");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while processing the image");
    } finally {
      setLoading(false); // Set loading to false when processing is complete
    }
  };

  // Clear the form and reset state
  const handleClear = () => {
    setSelectedImage(null);
    setError("");
    setLoading(false);
  };

  // useEffect(() => {
  //   console.log(imageUrls);
  // }, [imageUrls]);

  return (
    <div className="App">
      <h2>Upload Image for SRCNN Super Resolution</h2>

      {/* Form for image upload */}
      <form onSubmit={handleImageSubmit}>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
          onChange={handleImageChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display image preview */}
      {selectedImage && (
        <div className="preview">
          <h4>Selected Image Preview:</h4>
          <img src={selectedImage} alt="Selected" style={{ width: "200px" }} />
        </div>
      )}

      {/* Loading Spinner */}
      {loading && <div className="spinner">Processing Image...</div>}

      <br />

      {/* Display results side by side if available */}
      {imageUrls.length > 1 && (
        <div id="result">
          <h3>Results</h3>
          <div className="image-row">
            <div className="image-container">
              <h4>Zoomed Image:</h4>
              <a
                href={imageUrls[imageUrls.length - 2]}
                download="zoomed_image.jpg"
                className="download-link"
              >
                <img
                  src={imageUrls[imageUrls.length - 2]}
                  alt="Zoomed"
                  style={{ width: "300px" }}
                />
              </a>
            </div>

            <div className="image-container">
              <h4>Super-Resolved Image:</h4>
              <a
                href={imageUrls[imageUrls.length - 1]}
                download="super_resolved_image.jpg"
                className="download-link"
              >
                <img
                  src={imageUrls[imageUrls.length - 1]}
                  alt="Super Resolved"
                  style={{ width: "300px" }}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalFilter;
