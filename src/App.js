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
        <Route
          path="/"
          element={<HomePage auth={{ user: { name: "Test User" } }} />}
        />
        {/* Define the route with :songId */}
        <Route
          path="/lyrics/:songId"
          element={<Lyrics auth={{ user: { name: "Test User" } }} />}
        />
        <Route
          path="/admins"
          element={<RequestLagu auth={{ user: { name: "Test User" } }} />}
        />
        <Route
          path="/songs"
          element={<ListLagu auth={{ user: { name: "Test User" } }} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
