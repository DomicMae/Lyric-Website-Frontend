import BodyRegister from "../components/BodyRegister";

export default function Register(props) {
  return (
    <div className="min-h-screen flex bg-custom-blue">
      <main className="flex-grow flex justify-center items-center px-6">
        <section
          id="body-request"
          className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-lg sm:px-8"
        >
          <BodyRegister />
        </section>
      </main>
    </div>
  );
}
