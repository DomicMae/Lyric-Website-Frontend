import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import HomePage from "./pages/Homepage";
import Lyrics from "./pages/Lyrics";
import RequestLagu from "./pages/RequestLagu";
import ListLagu from "./pages/ListLagu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lyrics/:songId" element={<Lyrics />} />
        <Route path="/admins" element={<RequestLagu />} />
        <Route path="/songs" element={<ListLagu />} />
      </Routes>
    </Router>
  );
}

export default App;
