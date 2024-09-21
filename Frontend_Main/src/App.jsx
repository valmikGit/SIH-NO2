import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeatFinal from "./pages/HeatFinal";
import Home from "./pages/Home";
import { ImageProvider } from "./context/Base64Decode";
import FinalFilter from "./pages/FinalFilter";

function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/m" element={<HeatFinal />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/final" element={<FinalFilter />}></Route>
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}

export default App;
