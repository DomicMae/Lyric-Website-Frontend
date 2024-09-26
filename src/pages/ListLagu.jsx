import BodyListLagu from "../components/BodyListLagu";
import Footer from "../components/Footer";
import NavbarLyrics from "../components/NavbarLyrics";

export default function ListLagu(props) {
  return (
    <div className=" bg-custom-blue">
      <NavbarLyrics />
      <main>
        <section id="body-home" className="px-10">
          <BodyListLagu />
        </section>
      </main>
      <Footer/>
    </div>
  );
}
