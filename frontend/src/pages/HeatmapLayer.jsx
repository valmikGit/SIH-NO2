// // HeatmapLayer.js
// import { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet.heat";

// const HeatmapLayer = ({ data }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (map && data.length > 0) {
//       // Remove any existing heatmap layers
//       map.eachLayer((layer) => {
//         if (layer instanceof L.HeatLayer) {
//           map.removeLayer(layer);
//         }
//       });

//       // Transform data into [lat, lng, intensity] format
//       const heatData = data.map(({ lat, lng, price }) => [
//         parseFloat(lat),
//         parseFloat(lng),
//         price / 1000000, // Normalize price as intensity
//       ]);

//       // Create the heatmap layer and add it to the map
//       const heatLayer = L.heatLayer(heatData, { radius: 25 }).addTo(map);

//       // Adjust map bounds to fit the heatmap layer
//       map.fitBounds(heatLayer.getBounds());
//     }
//   }, [map, data]);

//   return null; // No need to render anything directly
// };

// export default HeatmapLayer;
import React from "react";
import MapWithHeatmap from "./MapWithHeatmap";

// Example array data (lat, lng, intensity)
const data = [
  [51.505, -0.09, 0.5],
  [51.51, -0.1, 0.8],
  [51.52, -0.12, 0.9],
  [51.515, -0.11, 0.6],
  [51.52, -0.13, 0.7],
  [51.517, -0.115, 0.4],
  [51.514, -0.12, 0.3],
  [51.51, -0.115, 0.2],
  // Add more points here...
];

const HeatmapLayer = () => (
  <div>
    <h1>Heatmap Example</h1>
    <MapWithHeatmap data={data} />
  </div>
);

export default HeatmapLayer;
