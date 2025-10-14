import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CivGame from "./Views/CivGame";
import UnitGame from "./Views/UnitGame";
import Home from "./Views/Home";
import About from "./Views/About";

import './Main.css'
import './Game.css'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/game/civ" element={<CivGame />} />
        <Route path="/game/unit" element={<UnitGame />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App