import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyRegister = () => {
  // State for input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      username: String(username),
      password: String(password),
      confirmPassword: String(confirmPassword),
    };

    try {
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      // Handle status 400: Username already taken
      if (response.status === 400) {
        setMessage(data.message); // Display the message from API
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log("Registration successful:", data);
      setMessage("Registrasi berhasil!");
      navigate("/login"); // Redirect after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black pt-5 pb-5">
      <div className="gap-4 p-10 w-full justify-center">
        <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
          Add User
        </h1>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`${
              message.includes("berhasil") ? "text-green-500" : "text-red-500"
            } pb-4`}
          >
            {message}
          </div>
        )}

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="">
            <label className="block text-lg font-medium text-custom-black mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full max-w-md h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
            />
          </div>

          {/* Password Input */}
          <div className="">
            <label className="block text-lg font-medium text-custom-black mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full max-w-md h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="">
            <label className="flex text-lg font-medium text-custom-black mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Masukkan konfirmasi password"
              className="w-full max-w-md h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="">
            <button
              type="submit"
              className="px-6 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyRegister;
