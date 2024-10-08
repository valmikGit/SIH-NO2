// // Heatmap.js
// import React from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import HeatmapLayer from "./pages/HeatmapLayer";

// const data = [
//   {
//     lat: "39.2705",
//     lng: "-76.6165",
//     price: 120000,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6155",
//     price: 234500,
//   },
//   // Add more data points here...
//   {
//     lat: "39.2705",
//     lng: "-76.6165",
//     price: 120000,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6155",
//     price: 234500,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6145",
//     price: 214750,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6135",
//     price: 354000,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6125",
//     price: 266655,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6115",
//     price: 389000,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6105",
//     price: 218800,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6165",
//     price: 261083,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6155",
//     price: 221333,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6145",
//     price: 277500,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6135",
//     price: 198250,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6125",
//     price: 211875,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6115",
//     price: 245000,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6105",
//     price: 252950,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6165",
//     price: 260300,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6155",
//     price: 363000,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6145",
//     price: 395000,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6135",
//     price: 235875,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6125",
//     price: 422333,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6115",
//     price: 363133,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6105",
//     price: 333628,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6165",
//     price: 356750,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6155",
//     price: 189233,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6145",
//     price: 183750,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6135",
//     price: 303475,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6115",
//     price: 283100,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6105",
//     price: 348873,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6165",
//     price: 207725,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6155",
//     price: 335183,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6145",
//     price: 329975,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6135",
//     price: 250750,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6125",
//     price: 241666,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6115",
//     price: 313000,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6105",
//     price: 387357,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6165",
//     price: 445000,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6155",
//     price: 339900,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6145",
//     price: 450000,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6135",
//     price: 347450,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6125",
//     price: 147014,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6105",
//     price: 405550,
//   },
//   {
//     lat: "39.2765",
//     lng: "-76.6185",
//     price: 335000,
//   },
//   {
//     lat: "39.2765",
//     lng: "-76.6155",
//     price: 300000,
//   },
//   {
//     lat: "39.2765",
//     lng: "-76.6145",
//     price: 115000,
//   },
//   {
//     lat: "39.2765",
//     lng: "-76.6115",
//     price: 206166,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6165",
//     price: 77439,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6155",
//     price: 311133,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6135",
//     price: 186000,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6105",
//     price: 345464,
//   },
//   {
//     lat: "39.2785",
//     lng: "-76.6155",
//     price: 287000,
//   },
//   {
//     lat: "39.2785",
//     lng: "-76.6135",
//     price: 241866,
//   },
//   {
//     lat: "39.2785",
//     lng: "-76.6125",
//     price: 267500,
//   },
//   {
//     lat: "39.2785",
//     lng: "-76.6105",
//     price: 639000,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6155",
//     price: 235000,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6145",
//     price: 346096,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6135",
//     price: 293400,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6125",
//     price: 306500,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6115",
//     price: 418333,
//   },
//   {
//     lat: "39.2705",
//     lng: "-76.6095",
//     price: 247500,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6095",
//     price: 282800,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6095",
//     price: 308987,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6095",
//     price: 220000,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6095",
//     price: 400375,
//   },
//   {
//     lat: "39.2765",
//     lng: "-76.6095",
//     price: 338400,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6095",
//     price: 305290,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6095",
//     price: 775000,
//   },
//   {
//     lat: "39.2715",
//     lng: "-76.6085",
//     price: 376500,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6085",
//     price: 365666,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6085",
//     price: 322450,
//   },
//   {
//     lat: "39.2745",
//     lng: "-76.6085",
//     price: 313333,
//   },
//   {
//     lat: "39.2755",
//     lng: "-76.6085",
//     price: 492580,
//   },
//   {
//     lat: "39.2765",
//     lng: "-76.6085",
//     price: 269666,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6085",
//     price: 251125,
//   },
//   {
//     lat: "39.2785",
//     lng: "-76.6085",
//     price: 378500,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6085",
//     price: 799000,
//   },
//   {
//     lat: "39.2725",
//     lng: "-76.6075",
//     price: 325000,
//   },
//   {
//     lat: "39.2735",
//     lng: "-76.6075",
//     price: 228000,
//   },
//   {
//     lat: "39.2775",
//     lng: "-76.6075",
//     price: 286000,
//   },
//   {
//     lat: "39.2785",
//     lng: "-76.6075",
//     price: 326000,
//   },
//   {
//     lat: "39.2795",
//     lng: "-76.6075",
//     price: 487275,
//   },
// ];

// const Heatmap = () => {
//   return (
//     <MapContainer
//       center={[39.2775, -76.6095]} // Adjust center based on your data
//       zoom={13}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <HeatmapLayer data={data} />
//     </MapContainer>
//   );
// };

// export default Heatmap;

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const MapWithHeatmap = ({ data }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && data.length > 0) {
      const map = mapRef.current;

      // Clear any existing heatmap layer
      map.eachLayer((layer) => {
        if (layer instanceof L.HeatLayer) {
          map.removeLayer(layer);
        }
      });

      // Create a new heatmap layer
      const heat = L.heatLayer(data, { radius: 25 }).addTo(map);
    }
  }, [data]);

  return (
    <MapContainer
      ref={mapRef}
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapWithHeatmap;
