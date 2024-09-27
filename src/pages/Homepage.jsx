import BodyDaftarLagu from "../components/BodyDaftarLagu";
import BodyHomePage from "../components/BodyHomePage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HomePage(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <Navbar />
      <main className="flex-grow">
        <section id="body-home" className="px-10">
          <BodyHomePage />
        </section>
        <section id="body-daftarlagu" className="py-10 px-10">
          <BodyDaftarLagu />
        </section>
      </main>
      <Footer className="h-[10vh]" />
    </div>
  );
}
