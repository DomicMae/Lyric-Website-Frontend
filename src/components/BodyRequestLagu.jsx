import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../input.css";

const BodyRequestLagu = () => {
  const [judulLagu, setJudulLagu] = useState("");
  const [artis, setArtis] = useState(null);
  const [lirikLagu, setLirikLagu] = useState("");
  const [songsLink, setsongsLink] = useState("");
  const [artistOptions, setArtistOptions] = useState([]);
  const [inputValue, setInputValue] = useState(""); // State for tracking search input
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch artist data
  const fetchArtists = async () => {
    try {
      const response = await fetch("https://website-lirik-c51g.vercel.app/api/artists");
      const result = await response.json();
      const options = result.data.map((artist) => ({
        value: artist.artistId,
        label: artist.artistName,
      }));
      setArtistOptions(options);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Handle input change in the Select component
  const handleInputChange = (value) => {
    setInputValue(value);
    const artistExists = artistOptions.some(option => option.label.toLowerCase() === value.toLowerCase());
    
    // If artist is not found, add the "Tambahkan Artis Baru" option
    if (!artistExists && value !== "") {
      setArtistOptions(prevOptions => [
        ...prevOptions.filter(option => option.value !== "new"), // remove old "new" option if exists
        { value: "new", label: `Tambahkan "${value}" sebagai artis baru` }
      ]);
    } else {
      // Remove "Tambahkan Artis Baru" option if input is empty or artist is found
      setArtistOptions(prevOptions => prevOptions.filter(option => option.value !== "new"));
    }
  };

  // Handle artist selection
  const handleArtistChange = (selectedOption) => {
    if (selectedOption?.value === "new") {
      // Logic to add new artist
      addNewArtist(inputValue);
    } else {
      setArtis(selectedOption);
    }
  };

  // Function to add a new artist
  const addNewArtist = async (artistName) => {
    if (artistName) {
      try {
        const artistData = { artistName: artistName };
        const response = await fetch("https://website-lirik-c51g.vercel.app/api/artists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData),
        });

        const result = await response.json();
        console.log("New artist added:", result);

        // Refresh artist list after adding new artist
        await fetchArtists();

        // Set the new artist as the selected one
        const newArtistOption = {
          value: result.data.artistId,
          label: result.data.artistName,
        };
        setArtis(newArtistOption);
      } catch (error) {
        console.error("Error adding new artist:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artis) {
      alert("Silahkan pilih artis terlebih dahulu");
      return;
    }

    const requestData = {
      songsName: judulLagu,
      artistId: artis.value,
      lirik: lirikLagu,
      songsLink: songsLink,
    };

    try {
      const response = await fetch("https://website-lirik-c51g.vercel.app/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Song successfully submitted:", data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting song data:", error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full h-full max-w-4xl p-10">
        <h1 className="text-4xl font-bold text-custom-black pb-8">Tambahkan Lagu Baru</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">Judul Lagu</label>
            <input
              type="text"
              value={judulLagu}
              onChange={(e) => setJudulLagu(e.target.value)}
              placeholder="Masukkan judul lagu"
              className="w-full h-14 px-6 py-2 text-lg rounded-xl bg-custom-blue-white"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">Nama Artis</label>
            <Select
              value={artis}
              onChange={handleArtistChange}
              onInputChange={handleInputChange} // Detect input changes
              options={artistOptions}
              placeholder="Pilih nama artis"
              className="basic-single"
              classNamePrefix="select"
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
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">Lirik Lagu</label>
            <textarea
              value={lirikLagu}
              onChange={(e) => setLirikLagu(e.target.value)}
              placeholder="Masukkan lirik lagu"
              className="w-full h-40 px-6 py-2 text-lg rounded-xl bg-custom-blue-white"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-custom-black mb-2">Link Lagu</label>
            <input
              type="text"
              value={songsLink}
              onChange={(e) => setsongsLink(e.target.value)}
              placeholder="Masukkan link lagu"
              className="w-full h-14 px-6 py-2 text-lg rounded-xl bg-custom-blue-white"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 text-lg font-bold text-white bg-custom-blue-seas rounded-xl"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Tambahkan Lagu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyRequestLagu;
