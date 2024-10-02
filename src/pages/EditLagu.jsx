import BodyEditLagu from "../components/BodyEditLagu";
import NavbarAdmins from "../components/NavbarAdmins";

export default function EditLagu(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow">
        <section id="body-request" className="px-10">
          <BodyEditLagu />
        </section>
      </main>
    </div>
  );
}
