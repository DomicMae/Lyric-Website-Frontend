import BodyRegister from "../components/BodyRegister";

export default function Register(props) {
  return (
    <div className="min-h-screen bg-custom-blue">
      <main>
        <section id="body-request" className="px-10">
          <BodyRegister />
        </section>
      </main>
    </div>
  );
}
