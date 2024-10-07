import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyRequestLagu = () => {
  // State for each input field
  const [judulLagu, setJudulLagu] = useState("");
  const [artis, setArtis] = useState(""); // For artist name input
  const [lirikLagu, setLirikLagu] = useState("");
  const [songsLink, setsongsLink] = useState("");
  const [artistId, setArtistId] = useState(""); // For artist ID
  const [loading, setLoading] = useState(false); // To show loading state
  const [message, setMessage] = useState(null); // To show success/error message
  const [artistCheckMessage, setArtistCheckMessage] = useState(""); // Message for artist checking
  const [artistExist, setArtisExist] = useState(false);
  const [CheckArtist, setCheckArtist] = useState(false);

  const navigate = useNavigate();

  // Function to check artist by name
  const checkArtist = async () => {
    setLoading(true); // Set loading state
    setCheckArtist(true);
    try {
      // Fetch artist data from API
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/artists"
      );
      const result = await response.json();

      // Check if the response contains data (the list of artists)
      if (result && result.data) {
        const artists = result.data; // Access the artist array

        // Normalize input and artist names to lowercase for case-insensitive comparison
        const normalizedInput = artis.toLowerCase().trim(); // Lowercase the input

        // Find if the artist exists in the API data
        const foundArtist = artists.find(
          (artist) => artist.artistName.toLowerCase().trim() === normalizedInput
        );

        setLoading(false); // Stop loading

        if (foundArtist) {
          setArtistId(foundArtist.artistId); // Set artist ID if found
          setArtistCheckMessage("Artis ditemukan!");
          setArtisExist(true);
        } else {
          setArtistCheckMessage("Data tidak ditemukan.");
          setArtistId(""); // Clear artist ID if not found
          setArtisExist(false);
        }
      } else {
        setLoading(false);
        setArtistCheckMessage("Tidak ada data artis yang ditemukan.");
        setArtisExist(false);
      }
    } catch (error) {
      setLoading(false);
      setArtistCheckMessage("Terjadi kesalahan saat memeriksa nama artis.");
      console.error("Error checking artist:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (CheckArtist === false) {
      alert("Silahkan cek artis terlebih dahulu");
      return;
    }

    let artistIdToUse;

    // Jika artis belum ada
    if (artistExist === false) {
      // Data
      const artistData = {
        artistName: String(artis), // Mengonversi nama artis menjadi string
      };

      try {
        // Melakukan request POST ke API untuk menambahkan artis
        const artistResponse = await fetch(
          "https://website-lirik-c51g.vercel.app/api/artists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(artistData),
          }
        );

        // Mengonversi respons menjadi JSON
        const artistDataResponse = await artistResponse.json();
        console.log("Artist Response Data:", artistDataResponse);

        // Mendapatkan artistId dari response
        artistIdToUse = artistDataResponse.data.artistId;
      } catch (error) {
        console.error("Error submitting artist data:", error);
        return; // Menghentikan proses jika terjadi error
      }
    } else {
      // Jika artis sudah ada, gunakan artistId yang sudah ada
      artistIdToUse = artistId;
    }

    // Data untuk menambahkan lagu
    const requestData = {
      songsName: String(judulLagu), // Pastikan judul lagu adalah string
      artistId: String(artistIdToUse), // Gunakan artistId yang diperoleh
      lirik: String(lirikLagu), // Pastikan lirik lagu adalah string
      songsLink: String(songsLink), // Pastikan link lagu adalah string
    };

    try {
      // Mengirim request POST ke API untuk menambahkan lagu
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/songs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Kirim data form sebagai JSON
        }
      );

      // Cek apakah respons berhasil
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Mengonversi respons menjadi JSON
      const data = await response.json();
      console.log("Song successfully submitted:", data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting song data:", error);
      return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full h-full max-w-4xl p-10">
        <div className="flex-col w-full h-full">
          {/* Title Section */}
          <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
            Tambahkan Lagu Baru
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
            {/* Song Title Input */}
            <div>
              <label className="block text-lg font-medium text-custom-black mb-2">
                Judul Lagu
              </label>
              <input
                type="text"
                value={judulLagu}
                onChange={(e) => setJudulLagu(e.target.value)}
                placeholder="Masukkan judul lagu"
                className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
                required
              />
            </div>

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
              <button
                type="button"
                onClick={checkArtist} // Call the checkArtist function
                className="mt-2 px-4 py-2 bg-custom-blue-seas text-white rounded-lg hover:bg-blue-600"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Memeriksa..." : "Cek Artis"}
              </button>

              {/* Artist Check Message */}
              {artistCheckMessage && (
                <div className="text-red-500 mt-2">{artistCheckMessage}</div>
              )}
            </div>

            {/* Lyrics Input */}
            <div>
              <label className="block text-lg font-medium text-custom-black mb-2">
                Lirik Lagu
              </label>
              <textarea
                value={lirikLagu}
                onChange={(e) => setLirikLagu(e.target.value)}
                placeholder="Masukkan lirik lagu"
                className="w-full h-40 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white"
                required
              />
            </div>

            {/* Link Songs */}
            <div>
              <label className="block text-lg font-medium text-custom-black mb-2">
                Link Lagu
              </label>
              <input
                type="text"
                value={songsLink}
                onChange={(e) => setsongsLink(e.target.value)}
                placeholder="Masukkan link lagu"
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
                {loading ? "Mengirim..." : "Tambahkan Lagu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BodyRequestLagu;
