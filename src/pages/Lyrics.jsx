import BodyLyricsLagu from "../components/BodyLyricsLagu";
import NavbarLyrics from "../components/NavbarLyrics";
import Footer from "../components/Footer";

export default function Lyrics(props) {
  return (
    <div className=" bg-custom-blue">
      <NavbarLyrics className="px-10" user={props.auth.user} />
      <main>
        <section id="body-lyrics" className="px-10">
          <BodyLyricsLagu />
        </section>
      </main>
      <Footer user={props.auth.user} />
    </div>
  );
}
