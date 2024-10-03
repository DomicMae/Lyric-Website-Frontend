import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../input.css";

const BodyViewLagu = () => {
    const [judulLagu, setJudulLagu] = useState("");
    const [selectedArtis, setSelectedArtis] = useState(null);
    const [lirikLagu, setLirikLagu] = useState("");
    const [songsLink, setsongsLink] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const { id } = useParams(); // Ambil ID lagu dari URL

    // Fetch song details when component mounts
    useEffect(() => {
        const fetchSongDetails = async () => {
        try {
            const songResponse = await fetch(`https://website-lirik-c51g.vercel.app/api/songs/${id}`);
            const songResult = await songResponse.json();

            if (songResult && songResult.data) {
            const song = songResult.data;
            setJudulLagu(song.songsName);
            setSelectedArtis(song.artist.artistName); // Set selected artist
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

        fetchSongDetails();
    }, [id]); // Dependency on id to fetch details for the correct song

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="text-black flex justify-center pt-5 pb-5">
            <div className="gap-4 p-10">
                <div className="flex-col">
                <h1 className="text-4xl font-bold sm:text-5xl text-custom-black pb-8">
                    Detail Lagu
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
                            Judul Lagu
                        </label>
                        <div className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md bg-custom-blue-white">
                            {judulLagu}
                        </div>
                    </div>

                    <div>
                    <label className="block text-lg font-medium text-custom-black mb-2">
                        Nama Artis
                    </label>
                    <p className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md bg-custom-blue-white">
                        {selectedArtis}
                    </p>
                    </div>

                    <div>
                    <label className="block text-lg font-medium text-custom-black mb-2">
                        Lirik Lagu
                    </label>
                    <textarea
                        value={lirikLagu}
                        readOnly
                        className="w-full h-40 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md bg-custom-blue-white"
                    />
                    </div>

                    <div>
                    <label className="block text-lg font-medium text-custom-black mb-2">
                        Link Lagu
                    </label>
                    <p className="w-full h-14 px-6 py-2 text-lg text-custom-black rounded-xl shadow-md bg-custom-blue-white">
                        <a href={songsLink} target="_blank" rel="noopener noreferrer">{songsLink}</a>
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

    export default BodyViewLagu;
