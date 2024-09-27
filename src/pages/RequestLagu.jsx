import BodyRequestLagu from "../components/BodyRequestLagu";
import NavbarAdmins from "../components/NavbarAdmins";

export default function RequestLagu(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow">
        <section id="body-request" className="px-10">
          <BodyRequestLagu />
        </section>
      </main>
    </div>
  );
}
