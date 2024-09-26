import BodyListLagu from "../components/BodyListLagu";
import Footer from "../components/Footer";
import NavbarLyrics from "../components/NavbarLyrics";

export default function ListLagu(props) {
  return (
    <div className=" bg-custom-blue">
      <NavbarLyrics user={props.auth.user} />
      <main>
        <section id="body-home" className="px-10">
          <BodyListLagu />
        </section>
      </main>
      <Footer user={props.auth.user} />
    </div>
  );
}
