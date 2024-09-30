import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyRequestArtis = () => {
  const [artis, setArtis] = useState(""); // State for artist name input
  const [loading, setLoading] = useState(false); // To show loading state
  const [message, setMessage] = useState(null); // To show success/error message
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const navigate = useNavigate(); // React Router's useNavigate hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const artistData = {
      artistName: String(artis),
    };

    setLoading(true); // Set loading state

    try {
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/artists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData), // Send form data as JSON
        }
      );

      // Check if response is successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Artist successfully created:", data);

      // Show success message and modal
      setMessage("Artis berhasil ditambahkan!");
      setShowModal(true); // Show the modal

      // Clear input field
      setArtis("");
    } catch (error) {
      console.error("Error submitting artist data:", error);
      setMessage("Terjadi kesalahan saat menambahkan artis.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle closing the modal and navigating to /admins
  const handleModalClose = () => {
    setShowModal(false); // Hide the modal
    navigate("/admins"); // Redirect to /admins
  };

  return (
    <div className="text-black flex justify-center pt-5 pb-5">
      <div className="gap-4 p-10">
        <div className="flex-col">
          {/* Title Section */}
          <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
            Tambahkan Artis Baru
          </h1>

          {/* Success/Error Message */}
          {message && !showModal && (
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
            {/* Artist Name Input */}
            <div>
              <label className="block text-lg font-medium text-custom-black mb-2">
                Nama Artis
              </label>
              <input
                type="text"
                value={artis}
                onChange={(e) => setArtis(e.target.value)}
                placeholder="Masukkan nama artis"
                className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Mengirim..." : "Tambahkan Artis"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              Artis berhasil ditambahkan!
            </h2>
            <button
              onClick={handleModalClose} // Close modal and redirect
              className="px-6 py-2 text-lg font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyRequestArtis;
