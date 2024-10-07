import BodyEditLagu from "../components/BodyEditLagu";
import NavbarAdmins from "../components/NavbarAdmins";

export default function EditLagu(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow flex">
        <section id="body-request" className="w-full h-full p-0">
          <BodyEditLagu />
        </section>
      </main>
    </div>
  );
}
