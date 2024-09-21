import React, { useState } from "react";

function FinalFilter() {
  const [selectedImage, setSelectedImage] = useState(null); // For image preview
  const [zoomedImage, setZoomedImage] = useState(null);
  const [superResImage, setSuperResImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle file input changes and preview the image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Create local URL for preview
  };

  // Handle image submission
  const handleImageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = e.target.image.files[0];
    formData.append("image", imageFile);

    setLoading(true); // Set loading to true

    try {
      const response = await fetch("http://localhost:5000/process_image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        // Set base64 images to the state
        setZoomedImage(`data:image/jpeg;base64,${result.zoomed_image}`);
        setSuperResImage(
          `data:image/jpeg;base64,${result.super_resolved_image}`
        );
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
    setZoomedImage(null);
    setSuperResImage(null);
    setError("");
    setLoading(false);
  };

  return (
    <div className="App">
      <h2>Upload Image for SRCNN Super Resolution</h2>

      {/* Form for image upload */}
      {!superResImage && (
        <form onSubmit={handleImageSubmit}>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display image preview */}
      {selectedImage && (
        <div className="preview">
          <h4>Selected Image Preview:</h4>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
      {zoomedImage && (
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
      )}

      {/* Loading Spinner */}
      {loading && <div className="spinner">Processing Image...</div>}

      <br />

      {/* Display results side by side if available */}
      {(zoomedImage || superResImage) && (
        <div id="result">
          <h3>Results</h3>
          <div className="image-row">
            {zoomedImage && (
              <div className="image-container">
                <h4>Zoomed Image:</h4>
                <a
                  href={zoomedImage}
                  download="zoomed_image.jpg"
                  className="download-link"
                >
                  <img src={zoomedImage} alt="Zoomed" />
                </a>
              </div>
            )}

            {superResImage && (
              <div className="image-container">
                <h4>Super-Resolved Image:</h4>
                <a
                  href={superResImage}
                  download="super_resolved_image.jpg"
                  className="download-link"
                >
                  <img src={superResImage} alt="Super Resolved" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalFilter;
