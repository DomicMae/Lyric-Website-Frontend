import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyLogin = () => {
  // State for input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    setLoading(true);

    const requestData = {
      username: String(username),
      password: String(password),
    };

    try {
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("JWT Token:", data.token); // Log JWT token to the console

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login berhasil!");

      // Arahkan ke halaman admins setelah login sukses
      navigate("/admins");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black pt-5 pb-5">
      <div className="gap-4 p-10 w-full justify-center">
        <div className="flex-col">
          <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
            Login User
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
            <div>
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
            <div>
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

            {/* Submit Button */}
            <div className="">
              <button
                type="submit"
                className="px-6 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BodyLogin;
