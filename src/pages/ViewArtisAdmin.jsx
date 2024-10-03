import NavbarAdmins from "../components/NavbarAdmins";
import BodyViewArtist from "../components/BodyViewArtis";
export default function ViewArtisAdmin(props) {
    return (
        <div className="min-h-screen flex flex-col bg-custom-blue">
            <NavbarAdmins />
            <main className="flex-grow">
                <section id="body-request" className="px-10">
                <BodyViewArtist />
                </section>
            </main>
        </div>
    );
}
