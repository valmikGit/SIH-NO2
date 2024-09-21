import HeatmapLayer from "react-leaflet-heatmap-layer";
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure leaflet CSS is loaded

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

// Sample data

const Map = () => {
  const position = [24.57623, 46.7480616]; // Position centered based on data

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={dta.map((point) => [
          parseFloat(point.latitude),
          parseFloat(point.longitude),
        ])}
        longitudeExtractor={(point) => point[1]}
        latitudeExtractor={(point) => point[0]}
        intensityExtractor={(point) => 1} // Adjust intensity as needed
      />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
