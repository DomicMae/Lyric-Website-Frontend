import "../input.css";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-custom-blue-seas text-custom-black text-center pt-8 pb-8 w-full justify-center font-bold font-jakarta">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} Anonymous - All right reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
