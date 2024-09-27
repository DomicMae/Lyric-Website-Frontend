import BodyListLagu from "../components/BodyListLagu";
import Footer from "../components/Footer";
import NavbarLyrics from "../components/NavbarLyrics";

export default function ListLagu(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarLyrics />
      <main className="flex-grow">
        <section id="body-home" className="px-10">
          <BodyListLagu />
        </section>
      </main>
      <Footer className="h-[10vh]" />
    </div>
  );
}
