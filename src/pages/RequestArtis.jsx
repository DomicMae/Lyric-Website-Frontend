import BodyRequestArtis from "../components/BodyRequestArtis";
import NavbarAdmins from "../components/NavbarAdmins";

export default function RequestArtis(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow">
        <section id="body-request" className="px-10">
          <BodyRequestArtis />
        </section>
      </main>
    </div>
  );
}
