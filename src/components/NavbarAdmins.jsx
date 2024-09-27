import "../input.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarAdmins = () => {
  const [username, setUsername] = useState(null);
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
    navigate("/login");
  };

  return (
    <nav className="navbar grid grid-cols-3  bg-custom-blue-seas dark:bg-custom-blue-seas p-5 px-14">
      <div className="items-center pr-6 pl-6">
        {/* Left side: Music Lyrics button */}
        <div className="col-span-1 flex justify-start">
          <a href="/" className="flex items-center font-bold">
            <button className="text-custom-black text-xl font-bold font-jakarta">
              Music Lyrics
            </button>
          </a>
        </div>
      </div>
      {/* Center: Add Lagu and Add Artis */}
      <div className="col-span-1 flex justify-center items-center space-x-8">
        <ul className="">
          <li>
            <a
              href="/admins"
              className="text-custom-black text-base font-bold font-jakarta"
            >
              Add Lagu
            </a>
          </li>
        </ul>
        <ul className="">
          <li>
            <a
              href="/addArtis"
              className="text-custom-black text-base font-bold font-jakarta"
            >
              Add Artis
            </a>
          </li>
        </ul>
      </div>
      {/* Right side: Display username if logged in */}
      <div className="col-span-1 flex justify-end items-center space-x-4">
        {username ? (
          <>
            <button
              onClick={handleLogout}
              className="text-white text-base font-bold font-jakarta bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
            <div className="text-custom-black text-base font-bold font-jakarta">
              Welcome, {username}!
            </div>
          </>
        ) : (
          <a
            href="/login"
            className="text-custom-black text-base font-bold font-jakarta"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavbarAdmins;
