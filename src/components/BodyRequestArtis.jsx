import { useState } from "react";
import "../input.css";

const BodyRequestArtis = () => {
  // State for artist name input
  const [artis, setArtis] = useState("");
  const [loading, setLoading] = useState(false); // To show loading state
  const [message, setMessage] = useState(null); // To show success/error message

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to add artist
    const artistData = {
      artistName: String(artis), // Convert artist name to string
    };

    setLoading(true); // Set loading state

    try {
      // Send POST request to add the artist
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

      // Convert response to JSON
      const data = await response.json();
      console.log("Artist successfully created:", data);

      // Show success message
      setMessage("Artis berhasil ditambahkan!");

      // Clear input field
      setArtis("");
    } catch (error) {
      console.error("Error submitting artist data:", error);
      setMessage("Terjadi kesalahan saat menambahkan artis.");
    } finally {
      setLoading(false); // Stop loading
    }
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
    </div>
  );
};

export default BodyRequestArtis;
