import BodyDaftarLagu from "../components/BodyDaftarLagu";
import Footer from "../components/Footer";
import NavbarLyrics from "../components/NavbarLyrics";

export default function DaftarLagu(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarLyrics />
      <main className="flex-grow">
        <section id="body-daftarlagu" className="py-10 px-4 sm:px-10">
          {" "}
          {/* Responsive padding */}
          <BodyDaftarLagu />
        </section>
      </main>
      <Footer className="h-[10vh]" />
    </div>
  );
}
