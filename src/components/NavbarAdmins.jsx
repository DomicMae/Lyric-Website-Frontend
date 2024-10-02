import "../input.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons

const NavbarAdmins = () => {
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the username from local storage (after login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token and user information from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  return (
    <nav className="navbar bg-custom-blue-seas dark:bg-custom-blue-seas p-5 px-4 md:px-14 flex justify-between items-center">
      {/* Left side: Music Lyrics button */}
      <div className="flex items-center">
        <a href="/admins" className="font-bold">
          <button className="text-custom-black text-xl font-bold font-jakarta">
            Music Lyrics
          </button>
        </a>
      </div>

      {/* Hamburger Menu Icon (visible on mobile only) */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-custom-black focus:outline-none"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}{" "}
          {/* Show X when open */}
        </button>
      </div>

      {/* Center and Right Links (hidden on mobile, visible on larger screens) */}
      <div className="hidden md:flex space-x-8 items-center">
        {/* Center: Add Lagu and Add Artis */}
        <ul className="flex space-x-8">
          <li>
            <a
              href="/addLagu"
              className="text-custom-black text-base font-bold font-jakarta"
            >
              Lagu
            </a>
          </li>
          <li>
            <a
              href="/addArtis"
              className="text-custom-black text-base font-bold font-jakarta"
            >
              Artis
            </a>
          </li>
        </ul>

        {/* Right: Username and Logout */}
        {username ? (
          <div className="flex items-center space-x-4">
            <span className="text-custom-black text-base font-bold font-jakarta">
              Welcome, {username}!
            </span>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-bold font-jakarta"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="text-custom-black text-base font-bold font-jakarta"
          >
            Login
          </a>
        )}
      </div>

      {/* Mobile Sidebar Menu (opens from the right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-custom-blue-seas shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="p-5">
          <button
            onClick={toggleMenu}
            className="text-custom-black focus:outline-none mb-5"
          >
            <X size={32} /> {/* Close icon */}
          </button>

          <ul className="space-y-4">
            <li>
              <a
                href="/addLagu"
                className="text-custom-black text-base font-bold font-jakarta block"
              >
                Lagu
              </a>
            </li>
            <li>
              <a
                href="/addArtis"
                className="text-custom-black text-base font-bold font-jakarta block"
              >
                Artis
              </a>
            </li>
          </ul>

          {/* Mobile: Username and Logout */}
          {username ? (
            <div className="mt-8 space-y-4">
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full font-bold font-jakarta"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="text-custom-black text-base font-bold font-jakarta block"
            >
              Login
            </a>
          )}
        </div>
      </div>

      {/* Overlay to close the sidebar */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
        ></div>
      )}
    </nav>
  );
};

export default NavbarAdmins;
