import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../input.css";

const BodyEditArtis = () => {
  const [artisName, setArtisName] = useState(""); // State for artist name input
  const [loading, setLoading] = useState(false); // To show loading state
  const [message, setMessage] = useState(null); // To show success/error message
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [artistId, setArtistId] = useState(null); // State for selected artist's ID
  const { id } = useParams();
  const [artists, setArtists] = useState([]); // State for storing fetched artists
  const [isArtistExists, setIsArtistExists] = useState(false); // State to check if artist exists
  const [isCheckClicked, setIsCheckClicked] = useState(false); // New state to track if "Cek Nama Artis" has been clicked
  const navigate = useNavigate(); // React Router's useNavigate hook

  useEffect(() => {
    const fetchArtis = async () => {
      setLoading(true);

      try {
        // Fetch current artist data by artistId
        const artistResponse = await fetch(
          `https://website-lirik-c51g.vercel.app/api/artists/${id}`
        );
        const artistData = await artistResponse.json();

        if (artistResponse.ok) {
          setArtisName(artistData.data.artistName); // Set current artist name
          setArtistId(artistData.data.artistId); // Set artist ID
        } else {
          setMessage("Artis tidak ditemukan.");
        }

        // Fetch all artists data for checking
        const allArtistsResponse = await fetch(
          "https://website-lirik-c51g.vercel.app/api/artists"
        );
        const allArtistsData = await allArtistsResponse.json();

        if (allArtistsResponse.ok) {
          setArtists(allArtistsData.data); // Set all artists to state
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setMessage("Terjadi kesalahan saat mengambil data artis.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtis();
  }, [id]);

  // Function to check if artist name exists in the database
  const handleCheckArtist = () => {
    const artistExists = artists.some(
      (artist) => artist.artistName.toLowerCase() === artisName.toLowerCase()
    );

    if (artistExists) {
      setMessage("Nama artis sudah ada, tidak bisa diperbarui.");
      setIsArtistExists(true); // Disable submit button if artist exists
    } else {
      setMessage("Nama artis tersedia.");
      setIsArtistExists(false); // Enable submit button if artist does not exist
    }

    setIsCheckClicked(true); // Set check clicked to true after checking
  };

  // Reset check state when artisName changes
  useEffect(() => {
    setIsCheckClicked(false); // Reset check click state
    setIsArtistExists(false); // Reset artist existence state
    setMessage(null); // Clear message
  }, [artisName]);

  // Function to handle form submission for updating the artist
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isArtistExists) {
      setMessage("Nama artis sudah ada, silakan pilih nama yang lain.");
      return;
    }

    const artistData = {
      artistName: String(artisName),
    };

    setLoading(true);

    try {
      const response = await fetch(
        `https://website-lirik-c51g.vercel.app/api/artists/${artistId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Artist successfully updated:", data);

      setMessage("Artis berhasil diperbarui!");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating artist data:", error);
      setMessage("Terjadi kesalahan saat memperbarui artis.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle closing the modal and navigating to /admins
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/admins");
  };

  return (
    <div className="text-black flex flex-col items-center pt-5 pb-5">
      <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
        Edit Artis
      </h1>

      {/* Artist Name Input Section */}
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-custom-black mb-2">
            Nama Artis
          </label>
          <input
            type="text"
            value={artisName}
            onChange={(e) => setArtisName(e.target.value)}
            placeholder="Nama artis"
            className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
            required
          />
        </div>
      </div>

      {/* Check Artist Button */}
      <button
        onClick={handleCheckArtist}
        className="mt-4 px-6 py-2 text-lg font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600"
      >
        Cek Nama Artis
      </button>

      {/* Message Section */}
      {message && (
        <div
          className={`mt-4 ${
            message.includes("berhasil") || message.includes("tersedia")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {/* Submit Button (disabled if artist exists or check not clicked) */}
      <form className="mt-6" onSubmit={handleSubmit}>
        <button
          type="submit"
          className={`px-6 py-2 text-lg font-bold text-white bg-green-500 rounded-xl hover:bg-green-600 ${
            isArtistExists || !isCheckClicked || loading ? "opacity-20" : ""
          }`}
          disabled={isArtistExists || !isCheckClicked || loading} // Disabled until check is clicked
        >
          {loading ? "Mengirim..." : "Perbarui Artis"}
        </button>
      </form>

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Artis berhasil diperbarui!</h2>
            <button
              onClick={handleModalClose}
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

export default BodyEditArtis;
