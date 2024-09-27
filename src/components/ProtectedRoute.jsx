import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika ada token, tampilkan konten halaman yang diminta
  return children;
};

export default ProtectedRoute;
