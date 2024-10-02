import BodyLyricsLagu from "../components/BodyLyricsLagu";
import NavbarLyrics from "../components/NavbarLyrics";
import Footer from "../components/Footer";

export default function Lyrics(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarLyrics className="px-10" />
      <main className="flex-grow">
        <section id="body-lyrics" className="px-2 sm:px-10">
          <BodyLyricsLagu />
        </section>
      </main>
      <Footer className="h-[10vh]" />
    </div>
  );
}
