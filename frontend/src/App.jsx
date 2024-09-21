import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ImageProvider } from "./context/Base64Decode";
import Heatmap from "./pages/MapWithHeatmap";
import HeatmapLayer from "./pages/HeatMapLayer";
import Map from "./pages/Map";
import HeatFinal from "./pages/HeatFinal";

function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/m" element={<HeatFinal />}></Route>
          <Route path="/" element={<HeatmapLayer />}></Route>
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}

export default App;
