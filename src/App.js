import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import HomePage from "./pages/Homepage";
import Lyrics from "./pages/Lyrics";
import RequestLagu from "./pages/RequestLagu";
import ListLagu from "./pages/ListLagu";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RequestArtis from "./pages/RequestArtis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lyrics/:songId" element={<Lyrics />} />
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <RequestLagu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addArtis"
          element={
            <ProtectedRoute>
              <RequestArtis />
            </ProtectedRoute>
          }
        />
        <Route path="/songs" element={<ListLagu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
