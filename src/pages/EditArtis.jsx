import BodyEditArtis from "../components/BodyEditArtis";
import NavbarAdmins from "../components/NavbarAdmins";

export default function EditArtis(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow">
        <section id="body-request" className="p-10">
          <BodyEditArtis />
        </section>
      </main>
    </div>
  );
}
