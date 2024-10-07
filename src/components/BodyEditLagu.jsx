import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Import Select from react-select
import "../input.css";

const BodyEditLagu = () => {
  // State for each input field
  const [judulLagu, setJudulLagu] = useState("");
  const [artisOptions, setArtisOptions] = useState([]); // State for artist options
  const [selectedArtis, setSelectedArtis] = useState(null); // State for selected artist
  const [lirikLagu, setLirikLagu] = useState("");
  const [songsLink, setsongsLink] = useState("");
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [message, setMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [newArtistName, setNewArtistName] = useState(""); // State for new artist name

  const navigate = useNavigate();
  const { id } = useParams(); // Catch the song ID from the URL

  // Fetch song details and artist options when component mounts
  useEffect(() => {
    const fetchSongDetailsAndArtists = async () => {
      try {
        // Fetching artists
        const artistsResponse = await fetch(
          "https://website-lirik-c51g.vercel.app/api/artists"
        );
        const artistsResult = await artistsResponse.json();

        if (artistsResult && artistsResult.data) {
          // Format data for react-select
          const options = artistsResult.data.map((artist) => ({
            value: artist.artistId,
            label: artist.artistName,
          }));
          // Add "Tambah Baru" option
          options.push({ value: "add_new", label: "Tambah Baru" });
          setArtisOptions(options);
        } else {
          setMessage("Tidak ada data artis yang ditemukan.");
        }

        // Fetching song details
        const songResponse = await fetch(
          `https://website-lirik-c51g.vercel.app/api/songs/${id}`
        );
        const songResult = await songResponse.json();

        if (songResult && songResult.data) {
          const song = songResult.data;
          setJudulLagu(song.songsName);
          setSelectedArtis({
            value: song.artistId,
            label: song.artist.artistName,
          }); // Set selected artist
          setLirikLagu(song.lirik);
          setsongsLink(song.songsLink);
        } else {
          setMessage("Data lagu tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchSongDetailsAndArtists();
  }, [id]); // Dependency on id to fetch details for the correct song

  const handleSelectChange = (option) => {
    if (option.value === "add_new") {
      setIsModalOpen(true); // Open modal to add new artist
    } else {
      setSelectedArtis(option); // Set selected artist
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedArtis) {
      alert("Silahkan pilih artis terlebih dahulu");
      return;
    }

    // Data for editing song
    const requestData = {
      songsName: String(judulLagu),
      artistId: String(selectedArtis.value), // Use selected artist ID
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

  const handleAddArtist = async () => {
    if (!newArtistName) {
      alert("Nama artis tidak boleh kosong.");
      return;
    }

    try {
      // Send POST request to add new artist
      const response = await fetch(
        "https://website-lirik-c51g.vercel.app/api/artists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ artistName: newArtistName }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Artist successfully added:", data);
      setArtisOptions([
        ...artisOptions,
        { value: data.artistId, label: newArtistName },
      ]); // Add new artist to options
      setNewArtistName(""); // Clear input field
      setIsModalOpen(false); // Close modal
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error adding artist:", error);
      setMessage("Terjadi kesalahan saat menambahkan artis.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full h-full max-w-4xl p-10">
        <div className="flex-col w-full h-full">
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

          <form className="space-y-6 w-full h-full" onSubmit={handleSubmit}>
            <div className="w-full">
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

            <div className="w-full text-lg">
              <label className="block font-medium text-custom-black mb-2">
                Nama Artis
              </label>
              <Select
                value={selectedArtis}
                onChange={handleSelectChange}
                options={artisOptions}
                placeholder="Pilih nama artis"
                className="w-full h-14"
                classNamePrefix="select"
                isSearchable
                styles={{
                  control: (provided) => ({
                    ...provided,
                    height: "56px",
                    padding: "0 12px",
                    borderRadius: "0.75rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #ccc",
                    backgroundColor: "#C1E8FF",
                  }),
                }}
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-lg font-medium text-custom-black mb-2">
                Lirik Lagu
              </label>
              <textarea
                value={lirikLagu}
                onChange={(e) => setLirikLagu(e.target.value)}
                placeholder="Masukkan lirik lagu"
                className="w-full h-auto px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-custom-blue-white min-h-[400px] sm:min-h-[400px] sm:w-full"
                required
              />
            </div>
            <div className="w-full">
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
