import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MemoryPuzzleGame from "./pages/MemoryPuzzleGame";
import CatchTheBall from "./pages/CatchTheBall";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router 
      future={{ 
        v7_relativeSplatPath: true,
        v7_startTransition: true 
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory-puzzle" element={<MemoryPuzzleGame />} />
        <Route path="/CatchTheBall" element={<CatchTheBall />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;