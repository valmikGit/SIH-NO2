import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure leaflet CSS is loaded
import "leaflet.heat"; // Import leaflet.heat plugin

// Sample data
// const dta = [
//   {
//     latitude: "24.5762300000",
//     longitude: "46.7480616000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5761266000",
//     longitude: "46.7480733000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5760016000",
//     longitude: "46.7481233000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5756433000",
//     longitude: "46.7483233000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5755950000",
//     longitude: "46.7483266000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5755533000",
//     longitude: "46.7483166000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5755116000",
//     longitude: "46.7483000000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5754800000",
//     longitude: "46.7482700000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5754166000",
//     longitude: "46.7481699000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5750166000",
//     longitude: "46.7472499000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5749633000",
//     longitude: "46.7471733000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5749333000",
//     longitude: "46.7471533000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5749049000",
//     longitude: "46.7471516000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5748800000",
//     longitude: "46.7471666000",
//     vehicleNo: "KHA-7234",
//   },
//   {
//     latitude: "24.5748016000",
//     longitude: "46.7472083000",
//     vehicleNo: "KHA-7234",
//   },
// ];
const dta = [
  { latitude: 28.6139, longitude: 77.209, price: 120000 },
  { latitude: 28.6139, longitude: 77.21, price: 234500 },
  { latitude: 28.6139, longitude: 77.211, price: 214750 },
  { latitude: 28.6139, longitude: 77.212, price: 354000 },
  { latitude: 28.6139, longitude: 77.213, price: 266655 },
  { latitude: 28.6139, longitude: 77.214, price: 389000 },
  { latitude: 28.6139, longitude: 77.215, price: 218800 },
  { latitude: 28.6149, longitude: 77.209, price: 261083 },
  { latitude: 28.6149, longitude: 77.21, price: 221333 },
  { latitude: 28.6149, longitude: 77.211, price: 277500 },
  { latitude: 28.6149, longitude: 77.212, price: 198250 },
  { latitude: 28.6149, longitude: 77.213, price: 211875 },
  { latitude: 28.6149, longitude: 77.214, price: 245000 },
  { latitude: 28.6149, longitude: 77.215, price: 252950 },
  { latitude: 28.6159, longitude: 77.209, price: 260300 },
  { latitude: 28.6159, longitude: 77.21, price: 363000 },
  { latitude: 28.6159, longitude: 77.211, price: 395000 },
  { latitude: 28.6159, longitude: 77.212, price: 235875 },
  { latitude: 28.6159, longitude: 77.213, price: 422333 },
  { latitude: 28.6159, longitude: 77.214, price: 363133 },
  { latitude: 28.6159, longitude: 77.215, price: 333628 },
  { latitude: 28.6169, longitude: 77.209, price: 356750 },
  { latitude: 28.6169, longitude: 77.21, price: 189233 },
  { latitude: 28.6169, longitude: 77.211, price: 183750 },
  { latitude: 28.6169, longitude: 77.212, price: 303475 },
  { latitude: 28.6169, longitude: 77.213, price: 283100 },
  { latitude: 28.6169, longitude: 77.214, price: 348873 },
  { latitude: 28.6179, longitude: 77.209, price: 207725 },
  { latitude: 28.6179, longitude: 77.21, price: 335183 },
  { latitude: 28.6179, longitude: 77.211, price: 329975 },
  { latitude: 28.6179, longitude: 77.212, price: 250750 },
  { latitude: 28.6179, longitude: 77.213, price: 241666 },
  { latitude: 28.6179, longitude: 77.214, price: 313000 },
  { latitude: 28.6179, longitude: 77.215, price: 387357 },
  { latitude: 28.6189, longitude: 77.209, price: 445000 },
  { latitude: 28.6189, longitude: 77.21, price: 339900 },
  { latitude: 28.6189, longitude: 77.211, price: 450000 },
  { latitude: 28.6189, longitude: 77.212, price: 347450 },
  { latitude: 28.6189, longitude: 77.213, price: 147014 },
  { latitude: 28.6189, longitude: 77.214, price: 405550 },
  { latitude: 28.6199, longitude: 77.208, price: 335000 },
  { latitude: 28.6199, longitude: 77.209, price: 300000 },
  { latitude: 28.6199, longitude: 77.21, price: 115000 },
  { latitude: 28.6199, longitude: 77.211, price: 206166 },
  { latitude: 28.6209, longitude: 77.209, price: 77439 },
  { latitude: 28.6209, longitude: 77.21, price: 311133 },
  { latitude: 28.6209, longitude: 77.211, price: 186000 },
  { latitude: 28.6209, longitude: 77.212, price: 345464 },
  { latitude: 28.6219, longitude: 77.21, price: 287000 },
  { latitude: 28.6219, longitude: 77.211, price: 241866 },
  { latitude: 28.6219, longitude: 77.212, price: 267500 },
  { latitude: 28.6219, longitude: 77.213, price: 639000 },
  { latitude: 28.6229, longitude: 77.21, price: 235000 },
  { latitude: 28.6229, longitude: 77.211, price: 346096 },
  { latitude: 28.6229, longitude: 77.212, price: 293400 },
  { latitude: 28.6229, longitude: 77.213, price: 306500 },
  { latitude: 28.6229, longitude: 77.214, price: 418333 },
  { latitude: 28.6239, longitude: 77.209, price: 247500 },
  { latitude: 28.6239, longitude: 77.21, price: 282800 },
  { latitude: 28.6239, longitude: 77.211, price: 308987 },
  { latitude: 28.6239, longitude: 77.212, price: 220000 },
  { latitude: 28.6239, longitude: 77.213, price: 400375 },
  { latitude: 28.6239, longitude: 77.214, price: 338400 },
  { latitude: 28.6239, longitude: 77.215, price: 305290 },
  { latitude: 28.6249, longitude: 77.209, price: 775000 },
  { latitude: 28.6249, longitude: 77.21, price: 376500 },
  { latitude: 28.6249, longitude: 77.211, price: 365666 },
  { latitude: 28.6249, longitude: 77.212, price: 322450 },
  { latitude: 28.6249, longitude: 77.213, price: 313333 },
  { latitude: 28.6249, longitude: 77.214, price: 492580 },
  { latitude: 28.6249, longitude: 77.215, price: 269666 },
  { latitude: 28.6259, longitude: 77.209, price: 251125 },
  { latitude: 28.6259, longitude: 77.21, price: 378500 },
  { latitude: 28.6259, longitude: 77.211, price: 799000 },
  { latitude: 28.6269, longitude: 77.209, price: 325000 },
  { latitude: 28.6269, longitude: 77.21, price: 228000 },
  { latitude: 28.6269, longitude: 77.211, price: 286000 },
  { latitude: 28.6269, longitude: 77.212, price: 326000 },
  { latitude: 28.6269, longitude: 77.213, price: 487275 },
];

// HeatmapLayer Component that applies the heatmap
const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatPoints = data.map((point) => [
      parseFloat(point.latitude),
      parseFloat(point.longitude),
      1, // Optional intensity value
    ]);

    const heatLayer = window.L.heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer); // Cleanup the heatmap layer when component unmounts
    };
  }, [data, map]);

  return null;
};

const HeatFinal = () => {
  // Centering the map on the first data point
  const position = [
    parseFloat(dta[0].latitude), // First latitude point from data
    parseFloat(dta[0].longitude), // First longitude point from data
  ];

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />

      {/* Use the HeatmapLayer component to display the heatmap */}
      <HeatmapLayer data={dta} />
    </MapContainer>
  );
};

export default HeatFinal;
