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
import HomePageAdmin from "./pages/HomePageAdmin";
import DaftarLagu from "./pages/DaftarLagu";
import EditLagu from "./pages/EditLagu";
import EditArtis from "./pages/EditArtis";
import AdminArtist from "./pages/AdminArtist";
import ViewLaguAdmin from "./pages/ViewLaguAdmin";
import ViewArtisAdmin from "./pages/ViewArtisAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daftarLagu" element={<DaftarLagu />} />
        <Route path="/lyrics/:songId" element={<Lyrics />} />
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <HomePageAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artists"
          element={
            <ProtectedRoute>
              <AdminArtist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addLagu"
          element={
            <ProtectedRoute>
              <RequestLagu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Lagu/:id"
          element={
            <ProtectedRoute>
              <ViewLaguAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Artist/:id"
          element={
            <ProtectedRoute>
              <ViewArtisAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editLagu/:id"
          element={
            <ProtectedRoute>
              <EditLagu />
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
        <Route
          path="/editArtis/:id"
          element={
            <ProtectedRoute>
              <EditArtis />
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
