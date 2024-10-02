import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../input.css";

const BodyEditLagu = () => {
  // State for each input field
  const [judulLagu, setJudulLagu] = useState("");
  const [artis, setArtis] = useState("");
  const [lirikLagu, setLirikLagu] = useState("");
  const [songsLink, setsongsLink] = useState("");
  const [artistId, setArtistId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [artistCheckMessage, setArtistCheckMessage] = useState("");
  const [artistExist, setArtisExist] = useState(false);
  const [CheckArtist, setCheckArtist] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Catch the song ID from the URL

  // Function to check artist by name
  const checkArtist = async () => {
    setLoading(true);
    setCheckArtist(true);
    try {
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/artists"
      );
      const result = await response.json();

      if (result && result.data) {
        const artists = result.data;
        const normalizedInput = artis.toLowerCase().trim();
        const foundArtist = artists.find(
          (artist) => artist.artistName.toLowerCase().trim() === normalizedInput
        );

        setLoading(false);

        if (foundArtist) {
          setArtistId(foundArtist.artistId);
          setArtistCheckMessage("Artis ditemukan!");
          setArtisExist(true);
        } else {
          setArtistCheckMessage("Data tidak ditemukan.");
          setArtistId("");
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

    if (artistExist === false) {
      const artistData = {
        artistName: String(artis),
      };

      try {
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

        const artistDataResponse = await artistResponse.json();
        console.log("Artist Response Data:", artistDataResponse);

        artistIdToUse = artistDataResponse.data.artistId;
      } catch (error) {
        console.error("Error submitting artist data:", error);
        return;
      }
    } else {
      artistIdToUse = artistId;
    }

    // Data for editing song
    const requestData = {
      songsName: String(judulLagu),
      artistId: String(artistIdToUse),
      lirik: String(lirikLagu),
      songsLink: String(songsLink),
    };

    try {
      // Send PUT request to update song
      const response = await fetch(
        `https://website-lirik-c51g.vercel.app/api/songs/${id}`,
        {
          method: "PUT", // Use PUT for editing
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
      console.log("Song successfully updated:", data);
      navigate("/admins"); // Redirect after success
    } catch (error) {
      console.error("Error updating song data:", error);
      return null;
    }
  };

  return (
    <div className="text-black flex justify-center pt-5 pb-5">
      <div className="gap-4 p-10">
        <div className="flex-col">
          <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
            Edit Lagu
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

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                onClick={checkArtist}
                className="mt-2 px-4 py-2 bg-custom-blue-seas text-white rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Memeriksa..." : "Cek Artis"}
              </button>

              {artistCheckMessage && (
                <div className="text-red-500 mt-2">{artistCheckMessage}</div>
              )}
            </div>

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

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl shadow-md hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Edit Lagu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BodyEditLagu;
