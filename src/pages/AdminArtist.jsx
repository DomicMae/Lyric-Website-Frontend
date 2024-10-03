import Footer from "../components/Footer";
import NavbarAdmins from "../components/NavbarAdmins";
import BodyAdminArtist from "../components/BodyAdminArtist";

export default function AdminArtist(props) {
    return(
        <div className="min-h-screen flex flex-col bg-custom-blue">
            <NavbarAdmins />
            <main className="flex-grow">
                <section id="body-home" className="">
                <BodyAdminArtist />
                </section>
            </main>
            <Footer className="h-[10vh]" />
        </div>
    );
}