import "../input.css";
import { Music } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BodyLyricsLagu = () => {
  const { songId } = useParams(); // Get songId from the URL
  const [songData, setSongData] = useState(null); // State to hold the song details
  const [artistName, setArtistName] = useState(""); // State to hold the artist name
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch song details by songId
  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(
          `https://website-lirik-c51g.vercel.app/api/songs/${songId}`
        );
        const data = await response.json();
        if (data.statusCode === 200) {
          setSongData(data.data); // Set the song data to state

          // Fetch the artist details using artistId
          const artistResponse = await fetch(
            `https://website-lirik-c51g.vercel.app/api/artists/${data.data.artistId}`
          );
          const artistData = await artistResponse.json();
          if (artistData.statusCode === 200) {
            setArtistName(artistData.data.artistName); // Set the artistName to state
          } else {
            console.error("Artist not found");
          }
        } else {
          console.error("Song not found");
        }
      } catch (error) {
        console.error("Error fetching song or artist details:", error);
      } finally {
        setLoading(false); // Set loading to false after both fetches are complete
      }
    };

    fetchSongDetails();
  }, [songId]);

  if (loading) {
    return <p>Loading...</p>; // Display loading state while fetching data
  }

  if (!songData) {
    return <p>Song not found!</p>; // Handle case when song is not found
  }

  return (
    <div className="text-black pt-10 pb-5 font-jakarta">
      <div className="gap-4 p-5">
        {/* Left Column: Music Icon */}
        <div className="flex items-center">
          <div className="mr-5">
            {/* Music Icon or Image */}
            <div className="w-20 h-20 bg-custom-blue-seas rounded-lg flex items-center justify-center shadow-md">
              <Music className="w-12 h-12 text-white" />
            </div>
          </div>
          {/* Song Details */}
          <div className="flex justify-between items-start space-x-8">
            {/* Left side: Title and Artist */}
            <div>
              <h1 className="text-4xl font-bold text-custom-black">
                {songData.songsName}
              </h1>
              {/* Display the fetched artist name */}
              <p className="text-lg font-semibold text-custom-blue-black">
                {artistName || "Unknown Artist"} {/* Display artistName */}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <p className="font-semibold text-custom-black">
            {songData.songsName} Lyrics
          </p>
          <p className="text-custom-black font-bold pt-6">[Intro]</p>
          {/* Lyrics */}
          <div>
            {songData.lirik.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyLyricsLagu;
