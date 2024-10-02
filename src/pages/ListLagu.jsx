import BodyListLagu from "../components/BodyListLagu";
import Footer from "../components/Footer";
import NavbarLyrics from "../components/NavbarLyrics";

export default function ListLagu(props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-blue">
      {/* Navbar: Make sure the navbar is responsive */}
      <NavbarLyrics />

      <main className="flex-grow">
        {/* Adjust padding for mobile and larger screens */}
        <section id="body-home" className="px-4 sm:px-10 py-6">
          <BodyListLagu />
        </section>
      </main>

      {/* Footer: Ensure the footer has a fixed height across all screen sizes */}
      <Footer className="h-[10vh]" />
    </div>
  );
}
