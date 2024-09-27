import BodyLogin from "../components/BodyLogin";

export default function Login(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      <main className="flex-grow">
        <section id="body-request" className="px-10">
          <BodyLogin />
        </section>
      </main>
    </div>
  );
}
