import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeatFinal from "./pages/HeatFinal";
import Home from "./pages/Home";
import { ImageProvider } from "./context/Base64Decode";

function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/m" element={<HeatFinal />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}

export default App;
