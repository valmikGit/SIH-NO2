import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure leaflet CSS is loaded
import "leaflet.heat"; // Import leaflet.heat plugin

// Sample data
const dta = [
  {
    latitude: "24.5762300000",
    longitude: "46.7480616000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5761266000",
    longitude: "46.7480733000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5760016000",
    longitude: "46.7481233000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5756433000",
    longitude: "46.7483233000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5755950000",
    longitude: "46.7483266000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5755533000",
    longitude: "46.7483166000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5755116000",
    longitude: "46.7483000000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5754800000",
    longitude: "46.7482700000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5754166000",
    longitude: "46.7481699000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5750166000",
    longitude: "46.7472499000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5749633000",
    longitude: "46.7471733000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5749333000",
    longitude: "46.7471533000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5749049000",
    longitude: "46.7471516000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5748800000",
    longitude: "46.7471666000",
    vehicleNo: "KHA-7234",
  },
  {
    latitude: "24.5748016000",
    longitude: "46.7472083000",
    vehicleNo: "KHA-7234",
  },
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
