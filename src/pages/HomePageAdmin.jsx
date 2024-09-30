import BodyHomePageAdmin from "../components/BodyHomePageAdmin";
import Footer from "../components/Footer";
import NavbarAdmins from "../components/NavbarAdmins";

export default function HomePageAdmin(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow">
        <section id="body-home" className="px-10">
          <BodyHomePageAdmin />
        </section>
      </main>
      <Footer className="h-[10vh]" />
    </div>
  );
}
