import BodyDaftarLagu from "../components/BodyDaftarLagu";
import BodyHomePage from "../components/BodyHomePage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HomePage(props) {
  return (
    <div className=" bg-custom-blue">
      <Navbar user={props.auth.user} />
      <main>
        <section id="body-home" className="px-10">
          <BodyHomePage />
        </section>
        <section id="body-daftarlagu" className="py-10 px-10">
          <BodyDaftarLagu />
        </section>
      </main>
      <Footer user={props.auth.user} />
    </div>
  );
}
