import BodyLogin from "../components/BodyLogin";

export default function Login(props) {
  return (
    <div className="min-h-screen flex bg-custom-blue">
      <main className="flex-grow flex justify-center items-center px-6">
        <section
          id="body-login"
          className="w-full max-w-md px-6 py-10 bg-white rounded-lg shadow-lg sm:px-8"
        >
          <BodyLogin />
        </section>
      </main>
    </div>
  );
}
