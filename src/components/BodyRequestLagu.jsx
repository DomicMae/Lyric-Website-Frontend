import { useState } from "react";
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

  // Function to check artist by name
  const checkArtist = async () => {
    setLoading(true); // Set loading state
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
          setArtistCheckMessage("Artis ditemukan! ID otomatis terisi.");
          setArtisExist(true);
        } else {
          setArtistCheckMessage("Data tidak ditemukan.");
          setArtistId(""); // Clear artist ID if not found
          setArtis(false);
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

  // Handle form submission for adding the song
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent page refresh

  //   // Create an object with the form data
  //   const requestData = {
  //     songsName: String(judulLagu), // Ensure it's a string
  //     artistId: String(artistId), // Ensure it's a string
  //     lirik: String(lirikLagu), // Ensure it's a string
  //     songsLink: String(songsLink), // Ensure it's a string
  //   };

  //   console.log("Request Data:", requestData);

  //   setLoading(true); // Set loading state
  //   // variabel artiw true
  //   if ((artistExist = true)) {
  //     try {
  //       // Send a POST request to the API
  //       const response = await fetch(
  //         "https://website-lirik-c51g.vercel.app/api/songs",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(requestData), // Send form data as JSON
  //         }
  //       );

  //       const data = await response.json();
  //       setLoading(false); // Set loading to false after the request

  //       if (response.ok && data.statusCode === 200) {
  //         setMessage("Lagu berhasil ditambahkan!");
  //         // Optionally clear the form after successful submission
  //         setJudulLagu("");
  //         setArtis("");
  //         setLirikLagu("");
  //         setsongsLink("");
  //         setArtistId(""); // Clear artistId field
  //       } else {
  //         setMessage("Gagal menambahkan lagu. Silakan coba lagi.");
  //       }
  //     } catch (error) {
  //       console.error("Error submitting song:", error);
  //       setMessage("Terjadi kesalahan saat menambahkan lagu.");
  //       setLoading(false);
  //     }
  //   } else {
  //     alert("sss");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Create an object with the form data for the song
    const requestData = {
      songsName: String(judulLagu), // Ensure it's a string
      artistId: String(artistId), // Ensure it's a string
      lirik: String(lirikLagu), // Ensure it's a string
      songsLink: String(songsLink), // Ensure it's a string
    };

    console.log("Request Data:", requestData);

    setLoading(true); // Set loading state

    // If artist exists, post the song directly
    if (artistExist) {
      try {
        // Send a POST request to the API to add the song
        const response = await fetch(
          "https://website-lirik-c51g.vercel.app/api/songs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData), // Send form data as JSON
          }
        );

        const data = await response.json();
        setLoading(false); // Set loading to false after the request

        if (response.ok && data.statusCode === 200) {
          setMessage("Lagu berhasil ditambahkan!");
          // Optionally clear the form after successful submission
          setJudulLagu("");
          setArtis("");
          setLirikLagu("");
          setsongsLink("");
          setArtistId(""); // Clear artistId field
        } else {
          setMessage("Gagal menambahkan lagu. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Error submitting song:", error);
        setMessage("Terjadi kesalahan saat menambahkan lagu.");
        setLoading(false);
      }
    } else {
      // Artist does not exist, first post the artist
      try {
        // Create an object for posting the artist
        const artistData = {
          artistName: String(artis), // Assuming `artis` is the artist name
        };

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

        const artistInfo = await artistResponse.json();

        if (artistResponse.ok && artistInfo.statusCode === 200) {
          // Artist created successfully, use the returned artistId
          const newArtistId = artistInfo.artistId;
          console.log("New Artist ID:", newArtistId);

          // Now, update the requestData with the new artistId
          requestData.artistId = newArtistId;

          // Proceed to post the song after adding the artist
          const songResponse = await fetch(
            "https://website-lirik-c51g.vercel.app/api/songs",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData), // Send form data as JSON
            }
          );

          const songData = await songResponse.json();
          setLoading(false); // Set loading to false after the request

          if (songResponse.ok && songData.statusCode === 200) {
            setMessage("Lagu berhasil ditambahkan setelah menambahkan artis!");
            // Optionally clear the form after successful submission
            setJudulLagu("");
            setArtis("");
            setLirikLagu("");
            setsongsLink("");
            setArtistId(""); // Clear artistId field
          } else {
            setMessage(
              "Gagal menambahkan lagu setelah artis. Silakan coba lagi."
            );
          }
        } else {
          setMessage("Gagal menambahkan artis. Silakan coba lagi.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error submitting artist or song:", error);
        setMessage("Terjadi kesalahan saat menambahkan artis atau lagu.");
        setLoading(false);
      }
    }
  };

  // false
  // post artist -> artis id udh ada -> post lagu

  return (
    <div className="text-black flex justify-center pt-5 pb-5">
      <div className="gap-4 p-10">
        <div className="flex-col">
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

            {/* Artist ID (Auto-filled after checking artist name) */}
            <div>
              <label className="block text-lg font-medium text-custom-black mb-2">
                ID Artis
              </label>
              <input
                type="text"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
                placeholder="ID akan terisi otomatis"
                className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md focus:outline-none bg-gray-100"
                disabled
              />
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
