import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../input.css";

const BodyViewArtist = () => {
    const [namaArtis, setNamaArtis] = useState("");
    const [artistSongResult, setArtistSongResult] = useState([])
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const { id } = useParams(); // Ambil ID artis dari URL

    // Fetch artist details when component mounts
    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                const artistResponse = await fetch(`https://website-lirik-c51g.vercel.app/api/artists/${id}`);
                const artistResult = await artistResponse.json();

                const artistSong = await fetch(`https://website-lirik-c51g.vercel.app/api/songsByArtist/${id}`);
                const artistSongResult = await artistSong.json();
                console.log(artistSongResult)

                if (artistResult && artistResult.data) {
                    const artist = artistResult.data;
                    setNamaArtis(artist.artistName); // Set nama artis
                    setArtistSongResult(artistSongResult)
                } else {
                    setMessage("Data artis tidak ditemukan.");
                }
            } catch (error) {
                console.error("Error fetching artist data:", error);
                setMessage("Terjadi kesalahan saat mengambil data.");
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchArtistDetails();
    }, [id]); // Dependency on id to fetch details for the correct artist

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="text-black flex justify-center pt-5 pb-5">
            <div className="gap-4 p-10">
                <div className="flex-col">
                    <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
                        Detail Artis
                    </h1>

                    {message && (
                        <div className={`${
                            message.includes("berhasil") ? "text-green-500" : "text-red-500"
                        } pb-4`}>
                            {message}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium text-custom-black mb-2">
                                Nama Artis
                            </label>
                            <div className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md bg-custom-blue-white">
                                {namaArtis}
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-custom-black mb-2">
                                Lagu Artis
                            </label>
                            <table className="w-full table-auto text-left bg-custom-blue-white shadow-md rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-2 text-lg font-medium">Judul Lagu</th>
                                        <th className="px-6 py-2 text-lg font-medium">Link Lagu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artistSongResult && artistSongResult.data && artistSongResult.data.map((song, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4">{song.songsName}</td>
                                            <td className="px-6 py-4">
                                                <a href={song.songsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                    {song.songsLink}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyViewArtist;
