import NavbarAdmins from "../components/NavbarAdmins";
import BodyViewLagu from "../components/BodyViewLagu";

export default function ViewLaguAdmin(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <NavbarAdmins />
      <main className="flex-grow">
        <section id="body-request" className="w-full h-full p-0">
          <BodyViewLagu />
        </section>
      </main>
    </div>
  );
}
