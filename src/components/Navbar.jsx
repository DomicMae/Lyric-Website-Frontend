import "../input.css";

const Navbar = () => {
  return (
    <nav className="navbar grid grid-cols-3  bg-custom-blue-seas dark:bg-custom-blue-seas p-5 px-14">
      <div className="items-center pr-6 pl-6">
        {/* Left side: Music Lyrics button */}
        <div className="col-span-1 flex justify-start">
          <a href="/" className="flex items-center font-bold">
            <button className="text-custom-black text-xl font-bold font-jakarta">
              Music Lyrics
            </button>
          </a>
        </div>
      </div>
      {/* Center: Beranda and Daftar Lagu */}
      <div className="col-span-1 flex justify-center items-center">
        <ul className="flex space-x-8">
          <li>
            <button className="text-custom-black text-base font-bold font-jakarta">
              Daftar Lagu
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
