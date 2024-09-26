// import React, { createContext, useState, useEffect } from "react";

// // Create a Context
// export const ImageContext = createContext();

// // Create a Provider Component
// export const ImageProvider = ({ children }) => {
//   const [base64String, setBase64String] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     const convertBase64ToImage = () => {
//       if (!base64String) return;

//       const binaryString = window.atob(base64String);
//       const byteArray = new Uint8Array(binaryString.length);
//       for (let i = 0; i < binaryString.length; i++) {
//         byteArray[i] = binaryString.charCodeAt(i);
//       }

//       const blob = new Blob([byteArray], { type: "image/jpeg" });
//       const url = URL.createObjectURL(blob);

//       setImageUrl(url);

//       // Cleanup function
//       return () => {
//         if (imageUrl) {
//           URL.revokeObjectURL(imageUrl);
//         }
//       };
//     };

//     convertBase64ToImage();
//   }, [base64String]);

//   return (
//     <ImageContext.Provider value={{ base64String, setBase64String, imageUrl }}>
//       {children}
//     </ImageContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";

// Create a Context
export const ImageContext = createContext();

// Create a Provider Component
export const ImageProvider = ({ children }) => {
  const [base64Strings, setBase64Strings] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Convert all base64 strings to image URLs
    const newUrls = base64Strings.map((base64String) => {
      const binaryString = window.atob(base64String);
      const byteArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      return URL.createObjectURL(blob);
    });

    setImageUrls(newUrls);

    // Cleanup function to revoke object URLs
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [base64Strings]);

  return (
    <ImageContext.Provider
      value={{ base64Strings, setBase64Strings, imageUrls }}
    >
      {children}
    </ImageContext.Provider>
  );
};
