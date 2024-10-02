import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyRegister = () => {
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

      if (response.status === 400) {
        setMessage(data.message);
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setMessage("Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      setMessage("Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      <div className="gap-4 sm:p-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-custom-black">
          Add User
        </h1>

        {message && (
          <div
            className={`${
              message.includes("berhasil") ? "text-green-500" : "text-red-500"
            } pb-4`}
          >
            {message}
          </div>
        )}

        <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full max-w-md h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full max-w-md h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Masukkan konfirmasi password"
              className="w-full max-w-md h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
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
